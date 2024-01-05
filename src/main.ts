import { createPinia } from 'pinia'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import router from './router'

import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import './styles/main.scss'
import 'uno.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

app.use(head)
app.use(router)
app.use(pinia)
app.mount('#app')
