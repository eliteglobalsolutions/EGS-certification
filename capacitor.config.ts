import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.eliteglobalsolutions.customer',
  appName: 'EGS',
  webDir: '.next',
  server: {
    url: process.env.CAPACITOR_SERVER_URL || 'https://eliteglobalsolutions.co/en/app',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: false,
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: '#0E0E0C',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0E0E0C',
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
    },
  },
};

export default config;
