<script>
  import { useRoute } from 'vue-router';
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useMessageStore } from '../store/messageStore';
  import { useAuthStore } from '../store/auth';
  import axios from 'axios';
  import Pusher from 'pusher-js';

  export default {
    setup() {
      const route = useRoute();
      const conversationId = route.params.conversationId; // Ottiene l'id della conversazione dalla route
      const messageStore = useMessageStore();
      const authStore = useAuthStore();

      
      const messages = ref([]); // Lista dei messaggi per la conversazione
      const users = ref([]); // Lista utenti
      const newMessage = ref(''); // Nuovo messaggio da inviare
      let pusherChannel;

      // Funzione per caricare i messaggi e gli utenti
      const loadMessages = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/messages/${conversationId}`, {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          });
          messages.value = response.data; // I messaggi
        } catch (error) {
          console.error('Errore nel caricare i messaggi:', error);
        }
      };

      // Funzione per inviare un messaggio
      const sendMessage = async () => {
        if (newMessage.value.trim()) {
          try {
            await axios.post(`http://127.0.0.1:8000/api/messages/${conversationId}`, {
              message_content: newMessage.value,
            }, {
              headers: {
                Authorization: `Bearer ${authStore.token}`,
              },
            });
            messageStore.addMessage(newMessage.value); // Aggiunge il messaggio allo store
            newMessage.value = ''; // Svuota l'input
          } catch (error) {
            console.error('Errore nell\'invio del messaggio:', error);
          }
        }
      };

      onMounted(() => {
        // Carica inizialmente i messaggi e gli utenti
        loadMessages();

        // Configurazione Pusher
        const pusher = new Pusher('e1e00377894dd9cd4d2b', {
          cluster: 'eu',
          encrypted: true,
        });

        // Sottoscrizione al canale della conversazione
        pusherChannel = pusher.subscribe(`conversation.${conversationId}`);
        
        // Ricezione dei messaggi inviati in tempo reale
        pusherChannel.bind('message.sent', (data) => {
          messages.value.push(data.message); // Aggiungi il nuovo messaggio
        });
      });

      onUnmounted(() => {
        // Annulla la sottoscrizione a Pusher
        if (pusherChannel) {
          pusherChannel.unsubscribe();
        }
      });

      return {
        conversationId,
        messages,
        users,
        newMessage,
        sendMessage,
      };
    },
  };
</script>

<template>
  <div class="chat-room">
    <h1 class="chat-room-title">Chat Room</h1>
    <p class="chat-room-id">Conversation ID: {{ conversationId }}</p>

    <!-- Elenco utenti partecipanti -->
    <div class="chat-users">
      <h3>Utenti:</h3>
      <ul>
        <li v-for="(user, index) in users" :key="index">{{ user.username }}</li>
      </ul>
    </div>

    <!-- Elenco dei messaggi -->
    <ul class="chat-messages">
      <li v-for="(message, index) in messages" :key="index" class="chat-message">
        <strong>{{ message.users[0].username }}:</strong> {{ message.message_content }}
      </li>
    </ul>

    <!-- Form di invio messaggio -->
    <div class="chat-input-container">
      <input
        v-model="newMessage"
        class="chat-input"
        placeholder="Scrivi un messaggio"
      />
      <button @click="sendMessage" class="chat-send-button">Invia</button>
    </div>
  </div>
</template>

<style scoped>
  .chat-room {
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }

  .chat-room-title {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .chat-room-id {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 16px;
  }

  .chat-users {
    margin-bottom: 16px;
  }

  .chat-users ul {
    list-style: none;
    padding: 0;
  }

  .chat-users li {
    padding: 4px 0;
    font-size: 1rem;
    color: #333;
  }

  .chat-messages {
    list-style: none;
    padding: 0;
    margin-bottom: 16px;
  }

  .chat-message {
    padding: 8px 12px;
    margin-bottom: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  .chat-input-container {
    display: flex;
    gap: 8px;
  }

  .chat-input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .chat-send-button {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .chat-send-button:hover {
    background-color: #0056b3;
  }
</style>
