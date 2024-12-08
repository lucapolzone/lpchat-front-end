<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import NotificationBadge from '../components/NotificationBadge.vue';

  export default {
    components: {
      NotificationBadge,
    },
    
    setup() {
      const conversations = ref([]);

      // Funzione per caricare le conversazioni
      const loadConversations = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/conversations');
          conversations.value = response.data;
        } catch (error) {
          console.error("Errore nel caricamento delle conversazioni:", error);
        }
      };


      // Carica le conversazioni e gli utenti al montaggio del componente
      onMounted(() => {
        loadConversations();
      });

      return {
        conversations,
      };
    },
  };
</script>

<template>
  <div>
    <!-- <h1>Dashboard</h1> -->
    <!-- <NotificationBadge /> Notifiche -->
    
    <!-- Box delle Conversazioni -->
    <div v-if="conversations.length > 0" id="dashboard-container">
      <h2>Utenti</h2>
      <ul>
        <li v-for="conversation in conversations">
          <p v-for="user in conversation.users">
            {{ user.username }}
            <span style="color: blue;"><small>Manda un messaggio</small></span>
          </p>
        </li>
      </ul>

      <h2 style="margin-top: 1rem;">Utenti e Conversazioni</h2>
      <ul>
        <li v-for="conversation in conversations" :key="conversation.id">
          <div class="card">
            <h3>Conversazione {{ conversation.id }}</h3>
            <h4>Utenti:</h4>
            <ul>
              <li v-for="user in conversation.users" :key="user.id">
                {{ user.username }} ({{ user.email }})
              </li>
            </ul>
            <router-link :to="'/chat-room/' + conversation.id">
              Vai alla chat
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  #dashboard-container {
    margin-top: 1rem;
  }

  .card {
    border: 1px solid #cecece; 
    border-radius: 20px; 
    max-width: 400px; 
    margin: 1rem auto;
    padding: 1rem
  }

</style>
