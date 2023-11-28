// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/fontaine',
            '@unocss/nuxt',
            '@pinia/nuxt',
  ],
      runtimeConfig: {
          homeAssistKey: '',
          homeAssistAddress: '',
          public: {
          }
      },
    vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: '@use "@/assets/_colors.scss" as *;'
              }
          }
      }
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },

})
