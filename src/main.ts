import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory }  from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import './style.css'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')