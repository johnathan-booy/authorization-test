import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "@/views/Home.vue"
import Profile from "@/views/Profile.vue"
import Login from "@/views/Login.vue"
import Connect from "@/views/Connect.vue"
import EmailLogin from "@/views/EmailLogin.vue"
import SignUp from "@/views/SignUp.vue"
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
    path: "/auth/signup",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login
  },
  {
    path: "/auth/login/magic-link",
    name: "EmailLogin",
    component: EmailLogin
  },
  {
    path: "/magic-link",
    name: "MagicLink",
    redirect() {
      return {
        name: "Profile",
        query: {}
      }
    }
  },
  {
    path: "/connect",
    name: "Connect",
    component: Connect
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

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.user) {
    next({ name: "Login" })
  } else {
    next()
  }
})

export default router
