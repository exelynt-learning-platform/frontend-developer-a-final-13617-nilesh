import { useEffect, useState } from 'react';
import NetworkLost from '/assets/images/offline-image/Internet-connection-lost-page.webp';

export const OfflineScreen = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
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
