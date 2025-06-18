import { config } from 'dotenv'
import type { ExpoConfig } from 'expo/config'

config()

const OWNER = 'mariuzm'
const BUNDLE_IDENTIFIER = 'com.mariuzm.myapp'
const NAME = 'My App'
const SLUG = 'myapp'
const VERSION = '1.0.0'
const BUILD = 1

export default (): ExpoConfig => {
  return {
    owner: OWNER,
    name: NAME,
    slug: SLUG,
    scheme: SLUG,
    version: VERSION,
    runtimeVersion: VERSION,

    icon: './src/assets/images/icon.png',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    platforms: ['ios', 'android'],
    newArchEnabled: true,
    experiments: { typedRoutes: true },

    ios: {
      bundleIdentifier: BUNDLE_IDENTIFIER,
      runtimeVersion: VERSION,
      buildNumber: BUILD.toString(),
      infoPlist: { CADisableMinimumFrameDurationOnPhone: true },
      supportsTablet: false,
      config: {
        usesNonExemptEncryption: false,
      },
    },

    android: {
      package: BUNDLE_IDENTIFIER,
      versionCode: BUILD,
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: ['NOTIFICATIONS', 'ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
    },

    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
    ],
  }
}
