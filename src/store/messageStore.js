import { defineStore } from 'pinia';

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [],  // Array per salvare i messaggi
  }),
  actions: {
    addMessage(message) {
      this.messages.push(message);
    },
    updateMessageStatus() {
      }
    },
    setMessages() {
    },
    clearMessages() {
    },
  },
);
