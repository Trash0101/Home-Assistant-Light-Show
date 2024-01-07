import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const HALSTheme = {
    dark: false,
    colors: {
        background: '#141018',
        surface: '#1b1520',
        primary: '#5e3a73',
        success: '#6de8ff',
    }
}

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        theme: {
            defaultTheme: 'HALSTheme',
            themes: {
                HALSTheme,
            }
        }
    })
    app.vueApp.use(vuetify)
})
