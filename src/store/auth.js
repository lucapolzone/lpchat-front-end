import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,  // Stato dell'utente, all'inizio è null
    token: null, // Token autenticazione
  }),
  actions: {
    setUser() {
      
    },
    setToken() {

    },


  },
  persist: true, // richiama pinia-plugin-persistedstate
});
