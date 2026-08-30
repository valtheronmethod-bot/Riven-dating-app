import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, Alert } from "react-native";
import { useNetworkState } from "expo-network";
import {
  DarkTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DevErrorBoundary = __DEV__
  ? ErrorBoundary
  : ({ children }: { children: React.ReactNode }) => <>{children}</>;

SplashScreen.preventAutoHideAsync();

const RivenDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    primary: "#C8102E",
    background: "#0D0D0F",
    card: "#1A1A1E",
    text: "#F2F0ED",
    border: "rgba(255,255,255,0.07)",
    notification: "#C8102E",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const networkState = useNetworkState();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasOnboarded = await AsyncStorage.getItem("@riven_has_onboarded");
      setInitialRoute(hasOnboarded === "true" ? "(tabs)" : "onboarding");
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded && initialRoute !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, initialRoute]);

  React.useEffect(() => {
    if (
      !networkState.isConnected &&
      networkState.isInternetReachable === false
    ) {
      Alert.alert(
        "You are offline",
        "You can keep using the app! Your changes will be saved locally and synced when you are back online."
      );
    }
  }, [networkState.isConnected, networkState.isInternetReachable]);

  if (!loaded || initialRoute === null) {
    return null;
  }

  return (
    <DevErrorBoundary>
      <StatusBar style="light" animated />
      <ThemeProvider value={RivenDarkTheme}>
        <SafeAreaProvider>
          <SubscriptionProvider>
            <WidgetProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack initialRouteName={initialRoute}>
                  <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="chat/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
                  <Stack.Screen name="profile/[id]" options={{ headerShown: false, animation: 'slide_from_right' }} />
                  <Stack.Screen name="location-share" options={{ headerShown: false, presentation: 'formSheet' }} />
                  <Stack.Screen name="location-consent" options={{ headerShown: false, presentation: 'modal' }} />
                  <Stack.Screen name="privacy-settings" options={{ headerShown: false, animation: 'slide_from_right' }} />
                  <Stack.Screen name="edit-profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
                  <Stack.Screen name="settings" options={{ headerShown: false, animation: 'slide_from_right' }} />
                  <Stack.Screen name="premium" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                  <Stack.Screen name="paywall" options={{ headerShown: false, presentation: 'modal' }} />
                </Stack>
                <SystemBars style="light" />
              </GestureHandlerRootView>
            </WidgetProvider>
          </SubscriptionProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </DevErrorBoundary>
  );
}
