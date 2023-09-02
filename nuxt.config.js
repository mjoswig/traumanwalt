export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Traumanwalt - Anwalt suchen und finden',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Raleway&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/firebase-storage' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID
        },
        services: {
          auth: {
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChanged',
            },
            ssr: true
          },
          storage: true
        }
      }
    ],
    '@nuxtjs/axios',
    '@nuxtjs/google-gtag',
    '@nuxtjs/sitemap',
    '@nuxtjs/toast'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Google Analytics Configuration
  'google-gtag': {
    id: process.env.FIREBASE_MEASUREMENT_ID
  },

  // Axios Configuration
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://traumanwalt.com' : 'http://localhost:3000/api'
  },

  // Server Middleware Configuration
  serverMiddleware: [
    { path: '/api', handler: '@/api/index.js' }
  ],

  // Sitemap Configuration
  sitemap: {
    hostname: 'https://traumanwalt.com'
  },

  // Toast Configuration
  toast: {
    position: 'top-center',
    duration: 2000
  }
}
