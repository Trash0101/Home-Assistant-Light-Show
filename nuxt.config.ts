// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/fontaine',
            '@unocss/nuxt',
            '@pinia/nuxt',
  ],
      runtimeConfig: {
          homeAssistKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwYWMzNDc5MTBlZWY0ZWQ3YmE5OTExOTQ2Y2M5OWE3ZCIsImlhdCI6MTcwMDczMDM1NCwiZXhwIjoyMDE2MDkwMzU0fQ.LzE3-nXdlQMp-0LzXe6BXdg1r75pCEP6vi7WNKEptMA',
          homeAssistAddress: 'http://localhost:8123',
          public: {
              homeAssistKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwYWMzNDc5MTBlZWY0ZWQ3YmE5OTExOTQ2Y2M5OWE3ZCIsImlhdCI6MTcwMDczMDM1NCwiZXhwIjoyMDE2MDkwMzU0fQ.LzE3-nXdlQMp-0LzXe6BXdg1r75pCEP6vi7WNKEptMA',
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
