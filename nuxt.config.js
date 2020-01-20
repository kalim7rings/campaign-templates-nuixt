require('dotenv').config();

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  //loading: { color: '#fff' },
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
      '@/assets/css/library/bootstrap.min.css',
      //'@/assets/css/library/font-awesome.min.css',
      '@/assets/css/style.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '@/plugins/lib/axios',
      '@/plugins/lib/moment',
      '@/plugins/lib/vee-validate',
      //'@/plugins/lib/event-bus',
      //'@/plugins/lib/collect',
      { src: '@/plugins/lib/localStorage.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/dotenv',
      ['@nuxtjs/axios', {
          baseURL: process.env.WEB_API_URL,
          credentials: false,
          browserBaseURL: '',
          proxyHeaders: true,
          redirectError: {
              401: '/'
          },
           requestInterceptor: (config, {store}) => {
              config.headers.common['X-Requested-With'] = 'XMLHttpsRequest';
               //config.headers.common['Authorization'] = 'Bearer ' + store.state.token;
               //config.headers.common['Authorization'] = '';
               //config.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json';
               return config;
           }
      }],
      '@nuxtjs/toast',
      //'@nuxtjs/auth',
  ],
 /* auth: {
        strategies: {
            local: {
                endpoints: {
                    //login: {url: '/user/login', method: 'post', propertyName: 'token' },
                    login: {url: '/api/login', method: 'post', propertyName: 'token' },
                    //user: {url: '/user/user', method: 'get', propertyName: 'data'},
                    //user: {url: '/api/users/3', method: 'get', propertyName: 'data'},
                    user: {url: '/user', method: 'post', propertyName: 'data'},

                    //login: {url: '/auth/login',method: 'post',propertyName: false},
                    //user: {url: '/auth/profile',method: 'get',propertyName: false},

                    //The user parameter helps to retrive the user information when logged in.
                    logout: false,  //Since REST is stateless we wont need this.
                },
                //tokenRequired: true,
                //tokenType: 'Bearer'
            },
        },
        // redirect: {
        //     login: '/?login=1',  //User will be redirected to this path if login is required.
        //     logout: '/',   //User will be redirected to this path if after logout, current route is protected.
        //     home: '/dashboard',   //User will be redirect to this path after login. (rewriteRedirects will rewrite this path)
        //     //callback: '/login',  //User will be redirect to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
        //     user: '/profile',
        //     //callback:'/'
        // }
  },*/
  toast: {
        position: 'top-right',
        duration: 5000
  },
  /*
  ** Build configuration
  */
  build: {
      transpile: ["vee-validate/dist/rules"],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
