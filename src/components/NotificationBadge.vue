<script>
import { ref, computed, onMounted } from 'vue';
import { useMessageStore } from '../store/messageStore';
import { useAuthStore } from '../store/auth';

export default {
  setup() {
    const messageStore = useMessageStore();
    const authStore = useAuthStore();
    
    // Lista dei messaggi non letti per l'utente loggato
    const unreadMessages = computed(() => {
      return messageStore.messages.filter(message => !message.read && message.receiverId === authStore.user.id);
    });

    const markAsRead = (messageId) => {
      // Simula l'aggiornamento del messaggio come letto
      messageStore.updateMessageStatus(messageId, true);
    };

    return {
      unreadMessages,
      markAsRead,
    };
  },
};
</script>

<template>
  <div class="notification-badge">
    <div v-if="unreadMessages.length > 0" class="badge">
      <span>{{ unreadMessages.length }}</span>
    </div>
    <ul v-if="unreadMessages.length > 0">
      <li v-for="message in unreadMessages" :key="message.id" class="notification-item">
        <p><strong>{{ message.senderName }}</strong>: {{ message.content }}</p>
        <button @click="markAsRead(message.id)">Mark as Read</button>
      </li>
    </ul>
    <p v-else>No new messages</p>
  </div>
</template>

<style scoped>
.notification-badge {
  position: relative;
  display: inline-block;
  margin-right: 10px;
}

.badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
}

.notification-item {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
