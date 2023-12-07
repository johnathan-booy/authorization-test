<template>
  <div class="home">
    <Navbar />
    <div class="header">
      <h1>OAuth Test</h1>
      <h2>Homepage</h2>
    </div>

    <div class="content">
      <p>Going to learn the basics of using Passport here!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue"
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.content {
  width: 100%;
  height: 80%;
  padding: 20px;
  background-color: #f4f4f4;
  color: #000;
}
</style>
