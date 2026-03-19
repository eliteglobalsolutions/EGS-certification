'use client';

import { useEffect } from 'react';

export function NativeAppInit() {
  useEffect(() => {
    async function init() {
      const { Capacitor } = await import('@capacitor/core');
      if (!Capacitor.isNativePlatform()) return;

      const { StatusBar, Style } = await import('@capacitor/status-bar');
      const { SplashScreen } = await import('@capacitor/splash-screen');

      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#0E0E0C' });
      await SplashScreen.hide({ fadeOutDuration: 300 });
    }

    init().catch(() => {});
  }, []);

  return null;
}
