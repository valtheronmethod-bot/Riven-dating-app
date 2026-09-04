/**
 * OneSignal Push Notification Context (Anonymous Mode)
 * Safe for Expo Go — skips gracefully if native module is absent.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Platform, TurboModuleRegistry } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra || {};
const ONESIGNAL_APP_ID = extra.oneSignalAppId || "";
const isWeb = Platform.OS === "web";

// Check if the OneSignal native module is actually present BEFORE requiring it.
// TurboModuleRegistry.get() returns null if not registered (safe, non-enforcing).
// This prevents the TurboModuleRegistry.getEnforcing crash in Expo Go.
const isOneSignalAvailable = (): boolean => {
  try {
    return TurboModuleRegistry.get("OneSignal") !== null;
  } catch {
    return false;
  }
};

interface NotificationContextType {
  hasPermission: boolean;
  permissionDenied: boolean;
  loading: boolean;
  isWeb: boolean;
  requestPermission: () => Promise<boolean>;
  sendTag: (key: string, value: string) => void;
  deleteTag: (key: string) => void;
  lastNotification: Record<string, unknown> | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastNotification, setLastNotification] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (isWeb) {
      setLoading(false);
      return;
    }

    if (!ONESIGNAL_APP_ID) {
      console.warn("[OneSignal] App ID not configured in app.json extra.oneSignalAppId");
      setLoading(false);
      return;
    }

    // Guard: only proceed if the native module is actually registered
    if (!isOneSignalAvailable()) {
      console.warn("[OneSignal] Native module not available (Expo Go). Push notifications require a custom dev build.");
      setLoading(false);
      return;
    }

    let OneSignalModule: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      OneSignalModule = require("react-native-onesignal").OneSignal;
    } catch (e) {
      console.warn("[OneSignal] Failed to load module:", e);
      setLoading(false);
      return;
    }

    try {
      OneSignalModule.initialize(ONESIGNAL_APP_ID);
      console.log("[OneSignal] Initialized with app ID:", ONESIGNAL_APP_ID);

      const permissionStatus = OneSignalModule.Notifications.hasPermission();
      setHasPermission(permissionStatus);

      const foregroundHandler = (event: any) => {
        event.getNotification().display();
        const notification = event.getNotification();
        console.log("[OneSignal] Foreground notification received:", notification.title);
        setLastNotification({
          title: notification.title,
          body: notification.body,
          additionalData: notification.additionalData,
        });
      };
      OneSignalModule.Notifications.addEventListener("foregroundWillDisplay", foregroundHandler);

      const permissionHandler = (granted: boolean) => {
        console.log("[OneSignal] Permission changed:", granted);
        setHasPermission(granted);
        setPermissionDenied(!granted);
      };
      OneSignalModule.Notifications.addEventListener("permissionChange", permissionHandler);

      return () => {
        OneSignalModule.Notifications.removeEventListener("foregroundWillDisplay", foregroundHandler);
        OneSignalModule.Notifications.removeEventListener("permissionChange", permissionHandler);
      };
    } catch (error) {
      console.error("[OneSignal] Initialization error:", error);
      return undefined;
    } finally {
      setLoading(false);
    }
    return undefined;
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    console.log("[OneSignal] Requesting notification permission");
    if (isWeb || !isOneSignalAvailable()) return false;
    let OneSignalModule: any;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      OneSignalModule = require("react-native-onesignal").OneSignal;
      const granted = await OneSignalModule.Notifications.requestPermission(true);
      console.log("[OneSignal] Permission request result:", granted);
      setHasPermission(granted);
      setPermissionDenied(!granted);
      return granted;
    } catch (error) {
      console.error("[OneSignal] Permission request failed:", error);
      return false;
    }
  }, []);

  const sendTag = useCallback((key: string, value: string) => {
    console.log("[OneSignal] sendTag:", key, value);
    if (isWeb || !isOneSignalAvailable()) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("react-native-onesignal").OneSignal.User.addTag(key, value);
    } catch (error) {
      console.error("[OneSignal] sendTag failed:", error);
    }
  }, []);

  const deleteTag = useCallback((key: string) => {
    console.log("[OneSignal] deleteTag:", key);
    if (isWeb || !isOneSignalAvailable()) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("react-native-onesignal").OneSignal.User.removeTag(key);
    } catch (error) {
      console.error("[OneSignal] deleteTag failed:", error);
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        hasPermission,
        permissionDenied,
        loading,
        isWeb,
        requestPermission,
        sendTag,
        deleteTag,
        lastNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
