import { createPinia } from 'pinia'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import router from './router'
import App from './App.vue'
import 'vue3-toastify/dist/index.css'

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
app.use(Vue3Toastify, {
  autoClose: 3000,
  limit: 1,
  multiple: false,
  containerClassName: 'toast',
} as ToastContainerOptions)
app.use(pinia)
app.mount('#app')
