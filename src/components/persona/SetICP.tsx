'use client';

import { useEffect } from 'react';
import { useICP, type ICPSlug } from '@/context/ICPContext';

// Sets the active ICP persona when an ICP page mounts, so the rest of the site
// (and Pragya, via onSetPersona) reflects who the visitor is. Renders nothing.
export function SetICP({ icp }: { icp: ICPSlug }) {
  const { setICP } = useICP();
  useEffect(() => {
    if (icp) setICP(icp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icp]);
  return null;
}
