import axios from 'axios'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

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
    { src: '@/plugins/firebase-storage' },
    { src: '@/plugins/autocomplete-vue' }
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
    '@nuxtjs/pwa',
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
    baseURL: process.env.NODE_ENV === 'production' ? 'https://traumanwalt.com/' : 'http://localhost:3000/'
  },

  // Server Middleware Configuration
  serverMiddleware: [
    { path: '/', handler: '@/api/index.js' }
  ],

  // Sitemap Configuration
  sitemap: {
    hostname: 'https://traumanwalt.com',
    routes: async () => {
      let routes = []

      /*const { data: legalFields } = await axios.get('https://traumanwalt.com/api/legal-fields')
      routes.push(...legalFields.map(lf => `/anwaelte/${lf.slug}`))

      const { data: cities } = await axios.get('https://traumanwalt.com/api/cities')
      routes.push(...cities.map(c => `/anwaelte/${c.slug}`))*/

      return routes
    }
  },

  // Toast Configuration
  toast: {
    position: 'top-center',
    duration: 2000
  },

  // PWA Configuration
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: process.env.NODE_ENV === 'development',
    }
  }
}
