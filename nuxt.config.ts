// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/fontaine',
            '@unocss/nuxt',
            '@pinia/nuxt',
      'nuxt-phosphor-icons',
      (_options, nuxt) => {
          nuxt.hooks.hook('vite:extendConfig', (config) => {
              // @ts-expect-error
              config.plugins.push(vuetify({ autoImport: true }))
          })
      }
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
      },
        vue: {
          template: {
              transformAssetUrls,
          }
        },
        ssr: {
            noExternal: ['vuetify']
        }
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    phosphor: {
      prefix: 'PH'
    }

})
