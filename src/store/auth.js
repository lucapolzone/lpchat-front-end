import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,  // Stato dell'utente, all'inizio è null
    token: null, // Token autenticazione
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    setToken(token) {
      this.token = token;
    },
    async login(credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', credentials);
        this.setUser(response.data.user);
        this.setToken(response.data.token);
      } catch (error) {
        throw new Error('Login fallito');
      }
    },
  },
  persist: true, // richiama pinia-plugin-persistedstate
});