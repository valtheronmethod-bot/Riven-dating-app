import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS } from '@/constants/Colors';

export interface Cluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  label: string;
  distance: string;
}

interface NearbyMapProps {
  clusters: Cluster[];
  centerLat: number;
  centerLng: number;
  onClusterTap: (cluster: Cluster) => void;
}

export function NearbyMap({ clusters, centerLat, centerLng, onClusterTap }: NearbyMapProps) {
  const clustersJson = JSON.stringify(clusters);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body, #map { width: 100%; height: 100%; background: #0D0D0F; }
    .leaflet-popup-content-wrapper {
      background: #1A1A1E;
      color: #F2F0ED;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
    }
    .leaflet-popup-tip { background: #1A1A1E; }
    .leaflet-popup-content { margin: 12px 16px; }
    .cluster-popup-title { font-size: 15px; font-weight: 700; color: #F2F0ED; margin-bottom: 4px; }
    .cluster-popup-dist { font-size: 12px; color: #A09CA8; margin-bottom: 8px; }
    .cluster-popup-note { font-size: 11px; color: #5C5868; font-style: italic; }
    .leaflet-control-attribution { display: none !important; }
    .leaflet-tile {
      filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%) saturate(0.8);
    }
    .leaflet-container {
      background: #0D0D0F;
    }
  </style>
</head>
<body>
<div id="map"></div>
<script>
  var map = L.map('map', {
    center: [${centerLat}, ${centerLng}],
    zoom: 13,
    zoomControl: false,
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    minZoom: 11,
    attribution: ''
  }).addTo(map);

  var clusters = ${clustersJson};

  clusters.forEach(function(cluster) {
    var radius = cluster.count > 20 ? 600 : cluster.count > 10 ? 450 : 300;
    var circle = L.circle([cluster.lat, cluster.lng], {
      radius: radius,
      color: '#C8102E',
      fillColor: '#C8102E',
      fillOpacity: 0.18,
      weight: 2,
      opacity: 0.6
    }).addTo(map);

    var tooltip = L.tooltip({
      permanent: true,
      direction: 'center',
      className: 'cluster-label'
    }).setContent('<span style="color:#FF6B8A;font-weight:700;font-size:11px;">' + cluster.label + '</span>');
    circle.bindTooltip(tooltip);

    circle.on('click', function() {
      var popup = L.popup()
        .setLatLng([cluster.lat, cluster.lng])
        .setContent(
          '<div class="cluster-popup-title">' + cluster.count + ' people nearby</div>' +
          '<div class="cluster-popup-dist">' + cluster.distance + '</div>' +
          '<div class="cluster-popup-note">Approximate areas only. Exact locations are never shared.</div>'
        )
        .openOn(map);

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'clusterTap', cluster: cluster }));
      }
    });
  });
</script>
</body>
</html>
  `;

  const handleMessage = (event: { nativeEvent: { data: string } }) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'clusterTap') {
        console.log('[NearbyMap] Cluster tapped:', data.cluster.id, data.cluster.label);
        onClusterTap(data.cluster);
      }
    } catch (e) {
      // ignore
    }
  };

  if (Platform.OS === 'web') {
    return <View style={[styles.container, { backgroundColor: COLORS.background }]} />;
  }

  return (
    <WebView
      style={styles.container}
      source={{ html }}
      onMessage={handleMessage}
      scrollEnabled={false}
      javaScriptEnabled
      originWhitelist={['*']}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
