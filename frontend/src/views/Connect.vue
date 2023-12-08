<template>
  <div class="login">
    <Navbar />
    <div class="header">
      <h1>Login using...</h1>
    </div>
    <div class="content">
      <div class="oauth-links">
        <a
          v-if="!user?.google_id"
          class="google-btn"
          href="http://localhost:3000/auth/google"
        >
          Google+
        </a>

        <a
          v-if="!user?.linkedin_id"
          class="linkedin-btn"
          href="http://localhost:3000/auth/linkedin"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue"
import { useAuthStore } from "@/stores/authStore"
import { computed } from "vue"

const authStore = useAuthStore()

const user = computed(() => {
  return authStore.user
})
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 20%;
  background-color: #eee;
  padding: 20px 0;
  text-align: center;
}

h1 {
  margin: 0;
  color: #333;
}

.content {
  padding: 20px;
  text-align: center;
}

.oauth-links {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.google-btn {
  display: inline-block;
  background-color: #dd4b39;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2em;
}

.linkedin-btn {
  display: inline-block;
  background-color: #0077b5;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2em;
}
</style>
