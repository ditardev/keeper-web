
// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

import {authorization_routes} from "@/router/router_auth.js";
import {home_routes} from "@/router/router_home.js";
import {error_routes} from "@/router/router_error.js";
import {getAuthUser} from "@/stores/user.js";

const routes = [
  authorization_routes,
  home_routes,
  error_routes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  let user = getAuthUser();
  if (
      user === null &&
      (to.name !== 'signIn') &&
      (to.name !== 'signUp') &&
      (to.name !== 'restore'))
  {
    next({name: 'signIn'})
  }
  if (
      user !== null &&
      user.expireAt < (new Date().getTime() / 1000) &&
      (to.name !== 'signIn'))
  {
    next({name: 'signIn'})
  } else {
    next()
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
}),

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
