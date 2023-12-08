<template>
  <div class="email-login">
    <Navbar />
    <div class="header">
      <h1>Send magic link to your email:</h1>
    </div>
    <div class="content">
      <div
        v-if="showForm"
        class="form"
      >
        <form @submit.prevent="handleSubmit">
          <input
            type="email"
            placeholder="Email"
            @input="handleEmailInput"
          />
          <button type="submit">Send</button>
        </form>
        <p
          v-if="errorMessage"
          class="error-message"
        >
          {{ errorMessage }}
        </p>
      </div>
      <div
        v-else
        class="success-message"
      >
        <p>If an account exists for {{ email }}, a magic link will be sent there shortly.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue"
import { useAuthStore } from "@/stores/authStore"
import { ref } from "vue"

const authStore = useAuthStore()
const email = ref("")
const showForm = ref(true)
const errorMessage = ref("")

const handleEmailInput = (e: any) => {
  email.value = (e.target as HTMLInputElement).value
  errorMessage.value = "" // Clear error message on new input
}

const handleSubmit = async () => {
  try {
    await authStore.sendMagicLink(email.value)
    showForm.value = false // Hide form on success
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
