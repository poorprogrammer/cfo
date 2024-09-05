import './assets/main.css'

import { createApp } from 'vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})
const app = createApp(App).use(router).use(vuetify)
app.mount('#app')
