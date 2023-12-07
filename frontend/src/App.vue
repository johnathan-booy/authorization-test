<template>
  <span>{{ user }}</span>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore"
import { onMounted } from "vue"
const authStore = useAuthStore()

const user = authStore.user

onMounted(() => {
  authStore.fetchUser()
})
</script>

<style>
:root {
  margin: 0;
}

* {
  box-sizing: border-box;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-style: normal;
  font-weight: 400;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  font-weight: 500;
}
</style>
