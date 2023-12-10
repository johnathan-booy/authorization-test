import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import { useAuthStore } from "./stores/authStore"

async function init() {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)

  const authStore = useAuthStore()

  // Check for authKey in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const authKey = urlParams.get("authKey")

  if (authKey) {
    // If there's an authKey, use it for verification
    try {
      await authStore.verifyMagicLink(authKey)
    } catch (error) {
      console.error("Error verifying magic link:", error)
    }
  }

  // Continue with fetching the user and initializing the app
  await authStore.fetchUser()

  // Load the router after the user is fetched
  app.use(router)

  app.mount("#app")
}

init()
