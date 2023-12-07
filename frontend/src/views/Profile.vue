<template>
  <div class="home">
    <Navbar />
    <div class="header">
      <h1>{{ authStore.user?.username }}</h1>
    </div>

    <div class="content">
      <p>More information about {{ authStore.user?.username }} here!</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue"
import { useAuthStore } from "@/stores/authStore"

const authStore = useAuthStore()
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
