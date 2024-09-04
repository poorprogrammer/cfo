import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import App2 from './App2.vue'
import router from './router'

const app = createApp(App2)

app.use(router)

app.mount('#app')
