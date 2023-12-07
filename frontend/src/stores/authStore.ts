import { defineStore } from "pinia"
import axios from "axios"

interface User {
  id: string
  username: string
  google_id: string
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null as User | null
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get<{ user: User }>("http://localhost:3000/user", { withCredentials: true })
        this.user = response.data.user
      } catch (error) {
        this.user = null
      }
    },
    async logout() {
      try {
        await axios.get("http://localhost:3000/auth/logout", { withCredentials: true })
        this.user = null
      } catch (error) {
        console.error("Error logging out:", error)
      }
    }
  }
})