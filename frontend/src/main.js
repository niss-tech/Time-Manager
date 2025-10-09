import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
app.mount('#app')
app.use(router)
