<template>
  <nav>
    <ul>
      <li><a href="/auth/login">Login</a></li>
      <li><a href="http://localhost:3000/auth/logout">Logout</a></li>
      <li><a href="/">Home</a></li>
      <li><a href="/profile">Profile</a></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup></script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 10px 0;
  text-align: center;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.2em;
}
</style>
