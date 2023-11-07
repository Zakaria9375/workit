import '@/assets/css/normalize.css'
import '@/assets/css/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { plugin, defaultConfig } from '@formkit/vue'
import formKitConfig from '@/formkit.config'
import i18n from './i18n'

const pinia = createPinia()
const app = createApp(App)
app.use(plugin, defaultConfig(formKitConfig))
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
