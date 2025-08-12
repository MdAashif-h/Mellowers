import  { useState, useEffect } from 'react';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setNetworkError(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setNetworkError(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const simulateLoading = (duration = 2000) => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), duration);
  };

  const retryConnection = () => {
    setNetworkError(false);
    setIsLoading(true);
    
    // Simulate connection attempt
    setTimeout(() => {
      if (navigator.onLine) {
        setIsLoading(false);
        setIsOnline(true);
      } else {
        setIsLoading(false);
        setNetworkError(true);
      }
    }, 2000);
  };

  return {
    isOnline,
    isLoading,
    networkError,
    simulateLoading,
    retryConnection
  };
};
 