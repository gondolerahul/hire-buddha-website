'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ICPSlug = 'medium-enterprise' | 'startups' | 'solopreneurs' | 'enterprise' | null;

interface ICPContextType {
  icp: ICPSlug;
  setICP: (icp: ICPSlug) => void;
  resetICP: () => void;
}

const ICPContext = createContext<ICPContextType | undefined>(undefined);

export const ICPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [icp, setIcpState] = useState<ICPSlug>(null);

  // Load persisted ICP on mount (30-day expiry).
  useEffect(() => {
    try {
      const stored = localStorage.getItem('hirebuddha_icp');
      if (stored) {
        const parsed = JSON.parse(stored);
        const limit = 30 * 24 * 60 * 60 * 1000;
        if (parsed.icp && parsed.activatedAt && Date.now() - parsed.activatedAt < limit) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setIcpState(parsed.icp);
        } else {
          localStorage.removeItem('hirebuddha_icp');
        }
      }
    } catch (e) {
      console.error('Failed to read ICP state:', e);
    }
  }, []);

  // Mirror the active ICP onto <html data-icp> so CSS accents can respond.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (icp) document.documentElement.setAttribute('data-icp', icp);
      else document.documentElement.removeAttribute('data-icp');
    }
  }, [icp]);

  const setICP = (newIcp: ICPSlug) => {
    setIcpState(newIcp);
    try {
      if (newIcp) {
        localStorage.setItem(
          'hirebuddha_icp',
          JSON.stringify({ icp: newIcp, source: 'self-select', activatedAt: Date.now(), confirmed: true })
        );
      } else {
        localStorage.removeItem('hirebuddha_icp');
      }
    } catch (e) {
      console.error('Failed to write ICP state:', e);
    }
  };

  const resetICP = () => setICP(null);

  return (
    <ICPContext.Provider value={{ icp, setICP, resetICP }}>
      {children}
    </ICPContext.Provider>
  );
};

export const useICP = () => {
  const context = useContext(ICPContext);
  if (!context) throw new Error('useICP must be used within an ICPProvider');
  return context;
};
