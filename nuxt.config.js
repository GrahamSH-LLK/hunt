export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hunt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/qr.client.js"],

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
          apiKey: 'AIzaSyCi-oDtlwk8Lm6HIgd3rEE0faAXZRqiBNo',
          authDomain: 'hunt-70916.firebaseapp.com',
          projectId: 'hunt-70916',
          storageBucket: 'hunt-70916.appspot.com',
          messagingSenderId: '738029389652',
          appId: '1:738029389652:web:611917a1a4527f14ce2ac1',
        },
        services: {
          database: true,

        }
      }
    ]
  ],


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
