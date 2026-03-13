import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.eliteglobalsolutions.customer',
  appName: 'EGS Customer',
  webDir: '.next',
  server: {
    url: process.env.CAPACITOR_SERVER_URL || 'https://eliteglobalsolutions.co/en',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
