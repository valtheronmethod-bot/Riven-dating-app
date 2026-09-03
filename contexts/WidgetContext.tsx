import * as React from "react";
import { createContext, useCallback, useContext, useRef } from "react";
import { Platform } from "react-native";

type WidgetContextType = {
  refreshWidget: () => void;
};

const WidgetContext = createContext<WidgetContextType | null>(null);

export function WidgetProvider({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storageRef = useRef<any>(null);

  React.useEffect(() => {
    if (Platform.OS !== "ios") return;

    try {
      // Dynamically require to avoid Android bundling the native module
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ExtensionStorage } = require("@bacons/apple-targets");
      storageRef.current = new ExtensionStorage("group.com.riven.app");
      console.log("[WidgetContext] ExtensionStorage initialized");
      ExtensionStorage.reloadWidget();
      console.log("[WidgetContext] Widget reloaded on mount");
    } catch (e) {
      console.warn("[WidgetContext] Failed to initialize ExtensionStorage:", e);
    }
  }, []);

  const refreshWidget = useCallback(() => {
    if (Platform.OS !== "ios") return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { ExtensionStorage } = require("@bacons/apple-targets");
      console.log("[WidgetContext] refreshWidget called");
      ExtensionStorage.reloadWidget();
    } catch (e) {
      console.warn("[WidgetContext] Failed to reload widget:", e);
    }
  }, []);

  return (
    <WidgetContext.Provider value={{ refreshWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}

export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
};
