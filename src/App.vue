<script>
export default {
  name: 'App',
};
</script>


<template>
  <div class="container">
    <div id="app">
      <!-- Layout di base, come la navbar -->
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
      </nav>

      <!-- Questa zona mostrerà i componenti specifici in base alla rotta -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>

  .container {
    max-width: 1280px;
    width: 100%;
    border: 1px solid rgb(141, 141, 141);
    margin: 2rem auto;
    text-align: center;
  }

  nav {
    background-color: #333;
    padding: 10px;
  }

  nav ul {
    list-style-type: none;
  }

  nav ul li {
    display: inline;
    margin-right: 15px;
  }

  nav ul li a {
    color: white;
  }

</style>
