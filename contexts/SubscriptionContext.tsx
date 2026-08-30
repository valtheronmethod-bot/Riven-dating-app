import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PREMIUM_KEY = '@riven_is_premium';
const RC_API_KEY_IOS = '';
const RC_API_KEY_ANDROID = '';
const ENTITLEMENT_ID = 'pro';

interface Package {
  identifier: string;
  product: {
    title: string;
    description: string;
    priceString: string;
    price: number;
  };
}

interface SubscriptionContextType {
  isPremium: boolean;
  setPremium: (value: boolean) => Promise<void>;
  isLoading: boolean;
  packages: Package[];
  purchasePackage: (pkg: Package) => Promise<boolean>;
  restorePurchases: () => Promise<boolean>;
  currentPrice: string;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isPremium: false,
  setPremium: async () => {},
  isLoading: true,
  packages: [],
  purchasePackage: async () => false,
  restorePurchases: async () => false,
  currentPrice: '$19.99/mo',
});

// eslint-disable-next-line @typescript-eslint/no-require-imports
let Purchases: typeof import('react-native-purchases').default | null = null;

try {
  // Dynamic require for graceful fallback on web/simulator
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('react-native-purchases') as { default: typeof import('react-native-purchases').default };
  Purchases = mod.default;
} catch {
  console.log('[Subscription] react-native-purchases not available (web/simulator)');
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState<Package[]>([]);
  const [currentPrice, setCurrentPrice] = useState('$19.99/mo');

  useEffect(() => {
    initRevenueCat();
  }, []);

  const initRevenueCat = async () => {
    console.log('[Subscription] Initializing RevenueCat...');
    try {
      // Load cached premium status first for fast UI
      const cached = await AsyncStorage.getItem(PREMIUM_KEY);
      if (cached === 'true') setIsPremium(true);

      if (!Purchases) {
        console.log('[Subscription] RevenueCat SDK not available, using cached state');
        setIsLoading(false);
        return;
      }

      const apiKey = Platform.OS === 'ios' ? RC_API_KEY_IOS : RC_API_KEY_ANDROID;
      if (!apiKey) {
        console.log('[Subscription] No RevenueCat API key configured, using cached state');
        setIsLoading(false);
        return;
      }

      await Purchases.configure({ apiKey });
      console.log('[Subscription] RevenueCat configured');

      // Check entitlement status
      const customerInfo = await Purchases.getCustomerInfo();
      const active = !!customerInfo.entitlements.active[ENTITLEMENT_ID];
      console.log('[Subscription] Premium active:', active);
      setIsPremium(active);
      await AsyncStorage.setItem(PREMIUM_KEY, active ? 'true' : 'false');

      // Load offerings
      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        const pkgs = offerings.current.availablePackages as Package[];
        setPackages(pkgs);
        if (pkgs.length > 0) {
          setCurrentPrice(pkgs[0].product.priceString + '/mo');
        }
        console.log('[Subscription] Packages loaded:', pkgs.length);
      }
    } catch (err) {
      console.log('[Subscription] Init error (non-fatal):', err);
    } finally {
      setIsLoading(false);
    }
  };

  const setPremium = useCallback(async (value: boolean) => {
    console.log('[Subscription] Setting premium status:', value);
    setIsPremium(value);
    await AsyncStorage.setItem(PREMIUM_KEY, value ? 'true' : 'false');
  }, []);

  const purchasePackage = useCallback(async (pkg: Package): Promise<boolean> => {
    console.log('[Subscription] Purchasing package:', pkg.identifier, pkg.product.priceString);
    if (!Purchases) {
      console.log('[Subscription] RevenueCat not available — simulating purchase');
      await setPremium(true);
      return true;
    }
    try {
      const result = await (Purchases as any).purchasePackage(pkg);
      const active = !!result.customerInfo.entitlements.active[ENTITLEMENT_ID];
      console.log('[Subscription] Purchase result — premium active:', active);
      if (active) {
        await setPremium(true);
      }
      return active;
    } catch (err: any) {
      if (err?.userCancelled) {
        console.log('[Subscription] Purchase cancelled by user');
        return false;
      }
      console.log('[Subscription] Purchase error:', err?.message ?? err);
      throw err;
    }
  }, [setPremium]);

  const restorePurchases = useCallback(async (): Promise<boolean> => {
    console.log('[Subscription] Restoring purchases...');
    if (!Purchases) {
      console.log('[Subscription] RevenueCat not available — cannot restore');
      return false;
    }
    try {
      const customerInfo = await Purchases.restorePurchases();
      const active = !!customerInfo.entitlements.active[ENTITLEMENT_ID];
      console.log('[Subscription] Restore result — premium active:', active);
      if (active) {
        await setPremium(true);
      }
      return active;
    } catch (err) {
      console.log('[Subscription] Restore error:', err);
      return false;
    }
  }, [setPremium]);

  return (
    <SubscriptionContext.Provider
      value={{ isPremium, setPremium, isLoading, packages, purchasePackage, restorePurchases, currentPrice }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  return useContext(SubscriptionContext);
}
