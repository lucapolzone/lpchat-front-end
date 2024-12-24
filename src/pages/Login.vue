<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/auth';

  export default {
    setup() {
      const router = useRouter();
      const authStore = useAuthStore();

      const email = ref('');
      const password = ref('');
      const errorMessage = ref('');

      const handleLogin = async () => {
        try {
          await authStore.login({ email: email.value, password: password.value });
          router.push('/dashboard'); // Reindirizza alla dashboard
        } catch (error) {
          errorMessage.value = 'Credenziali non valide. Riprova.';
        }
      };

      return {
        email,
        password,
        errorMessage,
        handleLogin,
      };
    },
  };
</script>

<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Inserisci la tua email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="Inserisci la tua password" />
      </div>
      <button type="submit">Accedi</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
  .login-container {
    max-width: 400px;
    margin: 3rem auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .error {
    color: red;
    font-size: 0.9em;
    margin-top: 10px;
  }
</style>
