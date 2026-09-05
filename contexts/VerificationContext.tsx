import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SUPABASE_BASE = 'https://owwzsvljrbibevrpjirt.supabase.co/functions/v1';
const HARDCODED_USER_ID = 'local_user';

export type VerificationStatus = 'none' | 'pending' | 'created' | 'completed' | 'approved' | 'declined' | 'failed';
export type VerificationTier = 'free' | 'premium';

interface VerificationContextValue {
  verificationStatus: VerificationStatus;
  verificationTier: VerificationTier | null;
  isVerified: boolean;
  isLoading: boolean;
  checkStatus: (userId: string) => Promise<void>;
  startVerification: (userId: string, tier: VerificationTier) => Promise<{ verification_url: string } | null>;
}

const VerificationContext = createContext<VerificationContextValue | null>(null);

export function VerificationProvider({ children }: { children: React.ReactNode }) {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('none');
  const [verificationTier, setVerificationTier] = useState<VerificationTier | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isVerified = verificationStatus === 'approved';

  const checkStatus = useCallback(async (userId: string) => {
    console.log('[VerificationContext] checkStatus called for userId:', userId);
    setIsLoading(true);
    try {
      const url = `${SUPABASE_BASE}/get-verification-status?user_id=${encodeURIComponent(userId)}`;
      console.log('[VerificationContext] GET', url);
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        console.error('[VerificationContext] checkStatus error response:', response.status, text);
        return;
      }
      const data = await response.json();
      console.log('[VerificationContext] checkStatus response:', data);
      setVerificationStatus((data.status as VerificationStatus) ?? 'none');
      setVerificationTier(data.tier ?? null);
    } catch (err) {
      console.error('[VerificationContext] checkStatus exception:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startVerification = useCallback(async (
    userId: string,
    tier: VerificationTier
  ): Promise<{ verification_url: string } | null> => {
    console.log('[VerificationContext] startVerification called — userId:', userId, 'tier:', tier);
    setIsLoading(true);
    try {
      const url = `${SUPABASE_BASE}/create-verification-session`;
      console.log('[VerificationContext] POST', url, { user_id: userId, tier });
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, tier }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error('[VerificationContext] startVerification error response:', response.status, text);
        return null;
      }
      const data = await response.json();
      console.log('[VerificationContext] startVerification response:', data);
      // Update status to pending after starting
      setVerificationStatus('pending');
      return { verification_url: data.verification_url };
    } catch (err) {
      console.error('[VerificationContext] startVerification exception:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('[VerificationContext] mount — auto-checking status for:', HARDCODED_USER_ID);
    checkStatus(HARDCODED_USER_ID);
  }, [checkStatus]);

  return (
    <VerificationContext.Provider
      value={{
        verificationStatus,
        verificationTier,
        isVerified,
        isLoading,
        checkStatus,
        startVerification,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification(): VerificationContextValue {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return ctx;
}

export { HARDCODED_USER_ID };
