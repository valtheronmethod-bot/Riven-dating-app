import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { WidgetProvider } from "@/contexts/WidgetContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { VerificationProvider } from "@/contexts/VerificationContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ErrorBoundary is always active (dev + production) so crashes show an error
// screen instead of a hard crash with no feedback.
const DevErrorBoundary = ErrorBoundary;

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

function OnboardingGate() {
  const router = useRouter();
  useEffect(() => {
    console.log('[OnboardingGate] Checking onboarding status');
    AsyncStorage.getItem('@riven_has_onboarded').then((val) => {
      console.log('[OnboardingGate] @riven_has_onboarded =', val);
      if (val !== 'true') {
        console.log('[OnboardingGate] Redirecting to /onboarding');
        router.replace('/onboarding');
      }
    }).catch((err) => {
      console.warn('[OnboardingGate] AsyncStorage error, redirecting to /onboarding:', err);
      router.replace('/onboarding');
    });
  }, []);
  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, fontError] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || fontError) SplashScreen.hideAsync();
  }, [loaded, fontError]);

  if (!loaded && !fontError) {
    return null;
  }

  return (
    <DevErrorBoundary>
      <NotificationProvider>
        <StatusBar style="light" animated />
        <ThemeProvider value={RivenDarkTheme}>
          <SafeAreaProvider>
            <SubscriptionProvider>
              <VerificationProvider>
                <WidgetProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack>
                      <OnboardingGate />
                      <Stack.Screen name="onboarding" options={{ headerShown: false, animation: 'fade' }} />
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen name="chat" options={{ headerShown: false, animation: 'slide_from_right' }} />
                      <Stack.Screen name="profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
                      <Stack.Screen name="location-share" options={{ headerShown: false, presentation: 'formSheet' }} />
                      <Stack.Screen name="location-consent" options={{ headerShown: false, presentation: 'modal' }} />
                      <Stack.Screen name="privacy-settings" options={{ headerShown: false, animation: 'slide_from_right' }} />
                      <Stack.Screen name="edit-profile" options={{ headerShown: false, animation: 'slide_from_right' }} />
                      <Stack.Screen name="settings" options={{ headerShown: false, animation: 'slide_from_right' }} />
                      <Stack.Screen name="premium" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                      <Stack.Screen name="paywall" options={{ headerShown: false, presentation: 'modal' }} />
                      <Stack.Screen name="notification-preferences" options={{ headerShown: false, animation: 'slide_from_right' }} />
                      <Stack.Screen name="verification" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                    </Stack>
                    <SystemBars style="light" />
                  </GestureHandlerRootView>
                </WidgetProvider>
              </VerificationProvider>
            </SubscriptionProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </NotificationProvider>
    </DevErrorBoundary>
  );
}
