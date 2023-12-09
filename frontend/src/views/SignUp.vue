<template>
  <div class="signup">
    <Navbar />
    <div class="header">
      <h1>Sign Up</h1>
    </div>
    <div class="content">
      <div class="form">
        <form @submit.prevent="handleSubmit">
          <input
            type="text"
            placeholder="Full Name"
            @input="handleNameInput"
          />
          <input
            type="email"
            placeholder="Email"
            @input="handleEmailInput"
          />
          <button type="submit">Sign Up</button>
        </form>
        <p
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue"
import { useAuthStore } from "@/stores/authStore"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const authStore = useAuthStore()
const email = ref("")
const name = ref("")
const errorMessage = ref("")

const handleEmailInput = (e: any) => {
  email.value = (e.target as HTMLInputElement).value
  errorMessage.value = ""
}

const handleNameInput = (e: any) => {
  name.value = (e.target as HTMLInputElement).value
  errorMessage.value = ""
}

const handleSubmit = async () => {
  try {
    await authStore.signUp(name.value, email.value)
    router.push({ name: "Profile" })
  } catch (err) {
    errorMessage.value = "Oops! Something went wrong. Please try again."
  }
}
</script>

<style scoped>
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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 300px;
  height: 40px;
  margin-bottom: 20px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 300px;
  height: 40px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
}
</style>
