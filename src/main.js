import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/Home.vue'
import Motor from './views/Motor.vue'
import Mobil from './views/Mobil.vue'
import Kontak from './views/Kontak.vue'
import Admin from './views/Admin.vue'
import './style.css'

const routes = [
  { path: '/', component: Home },
  { path: '/mobil', component: Mobil },
  { path: '/motor', component: Motor },
  { path: '/kontak', component: Kontak },
  { path: '/admin', component: Admin },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
