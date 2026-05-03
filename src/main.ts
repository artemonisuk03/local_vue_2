import './assets/main.css'

import { createApp } from 'vue'
import router from './router/router.ts'
import App from './App.vue'

createApp(App).use(router).mount('#app')
