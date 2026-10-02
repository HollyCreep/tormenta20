import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tormenta20.app',
  appName: 'Tormenta 20',
  webDir: 'dist',
  backgroundColor: '#110d0a',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#110d0a',
      overlaysWebView: false,
    },
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#110d0a',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
};

export default config;
