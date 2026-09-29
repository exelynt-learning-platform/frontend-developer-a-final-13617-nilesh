import { useEffect, useState } from 'react';
import NetworkLost from '@src/assets/images/offline-image/Internet-connection-lost-page.webp';

export const OfflineScreen = () => {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' && !navigator.onLine,
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <img
      src={NetworkLost}
      alt="No Internet Connection"
      className="fixed inset-0 h-full w-full object-cover z-[9999]"
    />
  );
};
