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
            @click="handleLinkClick(link.path)"
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
      name: "Login",
      path: "/auth/login",
      isVisible: !isAuthorized.value,
      isActive: activeRoute.path === "/auth/login"
    },
    {
      name: "Home",
      path: "/",
      isVisible: true,
      isActive: activeRoute.path === "/"
    },
    {
      name: "Profile",
      path: "/profile",
      isVisible: isAuthorized.value,
      isActive: activeRoute.path === "/profile"
    },
    {
      name: "Connect",
      path: "/connect",
      isVisible: isAuthorized.value,
      isActive: activeRoute.path === "/connect"
    }
  ]
})

// Methods
const handleLinkClick = (path: string) => {
  router.push(path)
}

const handleLogout = async () => {
  await authStore.logout()
  router.push("/auth/login")
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
