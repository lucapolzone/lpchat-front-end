<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../store/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    const conversations = ref([]);
    const users = ref([]);

    const loadConversations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/conversations', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        conversations.value = response.data;
      } catch (error) {
        console.error("Errore nel caricamento delle conversazioni:", error);
      }
    };

    const loadUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
        users.value = response.data;
      } catch (error) {
        console.error("Errore nel caricamento degli utenti:", error);
      }
    };

    onMounted(() => {
      loadConversations();
      loadUsers();
    });

    return {
      conversations,
      users,
    };
  },
};
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="users.length > 0">
      <h2>Utenti</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }}
        </li>
      </ul>
    </div>

    <div v-if="conversations.length > 0">
      <h2>Conversazioni</h2>
      <ul>
        <li v-for="conversation in conversations" :key="conversation.id">
          <router-link :to="'/chat-room/' + conversation.id">
            Vai alla chat con {{ conversation.users[0].username }}
          </router-link>
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