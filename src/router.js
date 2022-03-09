import { createRouter, createWebHistory } from "vue-router"
import { index } from "./store/index"

const routes = [
   {
      path: "/login",
      name: "login",
      meta: { layout: "empty", auth: false },
      component: () => import("./views/Login.vue"),
   },
   {
      path: "/register",
      name: "register",
      meta: { layout: "empty", auth: false },
      component: () => import("./views/Register.vue"),
   },
   {
      path: "/",
      name: "home",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Home.vue"),
   },
   {
      path: "/categories",
      name: "categories",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Categories.vue"),
   },
   {
      path: "/detail/:id",
      name: "detail",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Detail.vue"),
   },
   {
      path: "/history",
      name: "history",
      meta: { layout: "main", auth: true },
      component: () => import("./views/History.vue"),
   },
   {
      path: "/planning",
      name: "planning",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Planning.vue"),
   },
   {
      path: "/profile",
      name: "profile",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Profile.vue"),
   },
   {
      path: "/record",
      name: "record",
      meta: { layout: "main", auth: true },
      component: () => import("./views/Record.vue"),
   },
]

export const router = createRouter({
   routes,
   history: createWebHistory(process.env.BASE_URL),
   linkExactActiveClass: "active",
   linkActiveClass: "active",
})

router.beforeEach((to, from, next) => {
   const requireAuth = to.meta.auth

   if (requireAuth && index.getters["isAuthenticated"]) {
      next()
   } else if (requireAuth && !index.getters["isAuthenticated"]) {
      next("/login")
   } else {
      next()
   }
})
