<template>
  <nav>
    <ul>
      <template
        v-for="link in navLinks"
        :key="link.name"
      >
        <li v-if="link.isVisible">
          <a
            :class="{ active: link.isActive }"
            @click="handleLinkClick(link.name)"
            >{{ link.name }}</a
          >
        </li>
      </template>
      <li v-if="isAuthorized"><a @click="handleLogout()">Logout</a></li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useAuthStore } from "@/stores/authStore"

// Router
const router = useRouter()
const activeRoute = useRoute()

// Store
const authStore = useAuthStore()

// Computed properties
const isAuthorized = computed(() => {
  return !!authStore.user
})

const navLinks = computed(() => {
  return [
    {
      name: "SignUp",
      isVisible: !isAuthorized.value,
      isActive: activeRoute.name === "SignUp"
    },
    {
      name: "Login",
      isVisible: !isAuthorized.value,
      isActive: activeRoute.name === "Login"
    },
    {
      name: "Home",
      isVisible: true,
      isActive: activeRoute.name === "Home"
    },
    {
      name: "Profile",
      isVisible: isAuthorized.value,
      isActive: activeRoute.name === "Profile"
    },
    {
      name: "Connect",
      isVisible: isAuthorized.value,
      isActive: activeRoute.name === "Connect"
    }
  ]
})

// Methods
const handleLinkClick = (name: string) => {
  router.push({ name })
}

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: "Login" })
}

// Lifecycle hooks
onMounted(() => {
  authStore.fetchUser()
})
</script>

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

nav a.active {
  pointer-events: none;
  opacity: 0.6;
  cursor: default;
}
</style>
