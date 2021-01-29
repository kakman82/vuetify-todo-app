import colors from 'vuetify/es5/util/colors'

export default {

  // Netlify deploy için gerekliymiş ref: https://nuxtjs.org/docs/2.x/deployment/netlify-deployment
  target: 'static',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    // titleTemplate: '%s - vuetify-todo-udemy',
    title: 'Vuetify Todo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    //! icon değiştimek istersek --> https://laptrinhx.com/how-to-change-the-favicon-in-nuxt-191316310/
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png'  }],
  },
  //! mobile dan uygulamaya erişebilmek için bu tanımı yaptım
  //! ref: https://nuxtjs.org/docs/2.x/features/configuration#edit-host-and-port
  server: {
    host: '0', // default: localhost
    port: 9000 // default: 3000
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    //! https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns', 

  ],
  //! nasıl eklendiğini göstermek için ekledim yukarıda da ana modül tanımı mevcut, kullanım için --> https://github.com/nuxt-community/date-fns-module
  dateFns: { format: 'dd.MM.yyyy' },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    //! dil seçimi için yapılan tanım
    [
      'nuxt-i18n',
      {
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          onlyOnRoot: true,  // recommended
        },
        /* module options */
        locales: [
          {
            code: 'en',
            iso: 'en-US',
            name: 'ENG',
          },
          {
            code: 'tr',
            iso: 'tr-TR',
            name: 'TR',
          },
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: require('./locales/en.json'),
            tr: require('./locales/tr.json'),
          },
        },
        // https://i18n.nuxtjs.org/routing
        parsePages: false,   // Disable babel parsing
        pages: {
          about: {
            en: '/about-us', // -> accessible at /about-us (no prefix since it's the default locale)
            tr: '/hakkimizda', // -> accessible at /fr/a-propos
          }
        }
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    //! Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory - hatası için bu tanımı yaptım limiti artırmak için 
    //! --> https://stackoverflow.com/questions/61010192/nuxt-and-axios-javascript-heap-out-of-memory
    
    standalone: true
  },
  //! middleware tanımı için kullanmıştım fakat document.title erişemediğim için page içindeki dosyalarda tanımı yaptım. Detay açıklama middleware/pageTitle.js içinde yazdım
  router: {
    // middleware: 'pageTitle'
  }
}
