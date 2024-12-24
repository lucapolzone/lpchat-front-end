import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';
import piniaPersist from 'pinia-plugin-persistedstate';
import './style.css'
import App from './App.vue'
// import Pusher from 'pusher-js';

const pinia = createPinia();
pinia.use(piniaPersist); // plugin per la persistenza

// // Variabili d'ambiente per Pusher
// const pusher = new Pusher('e1e00377894dd9cd4d2b', {
//   cluster: 'eu',
//   encrypted: true
// });

// Sottoscrizione al canale privato della conversazione
// const channel = pusher.subscribe('conversation.' + conversationId); // conversationId arriva dal Vue router


// Sottoscrizione all'evento message.sent definito nel back-end
// channel.bind('message.sent', function(data) {
//   console.log('Nuovo messaggio ricevuto: ', data);
  
//   // Aggiunge il nuovo messaggio allo store di pinia
//   const messageStore = useMessageStore(); // Usa lo store di Pinia
//   messageStore.addMessage(data.message); // Aggiunge il messaggio
// });


createApp(App)
  .use(pinia) // <- aggiungo pinia
  .use(router)
  .mount('#app')