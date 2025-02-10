import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from '@/App.vue'
import router from '@/router'

const targetElement = document.getElementById('root')

if (targetElement) {
  const app = createApp(App)
  app.use(VueQueryPlugin)
  app.use(router)
  router.isReady().then(() => app.mount(targetElement))
}
