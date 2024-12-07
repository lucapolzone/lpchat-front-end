import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import './style.css'
import App from './App.vue'

const pinia = createPinia();
pinia.use(piniaPersist); // plugin per la persistenza

createApp(App)
  .use(pinia) // <- aggiungo pinia
  .mount('#app')
