import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "@/views/Home.vue"
import Profile from "@/views/Profile.vue"
import Login from "@/views/Login.vue"
import { useAuthStore } from "./stores/authStore"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login
  },

  // Add more routes here

  // Catch-all route goes Home
  // This must be last
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.user) {
      next({ name: "Login" })
    } else {
      next()
    }
  }

  next()
})

export default router
