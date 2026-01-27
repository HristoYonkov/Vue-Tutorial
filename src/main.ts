import './style.css'
import 'primeicons/primeicons.css'
import router from './components/ExampleApp/router'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(router);

app.mount('#app');
