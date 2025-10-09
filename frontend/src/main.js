import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
