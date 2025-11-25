// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'

import {authorization_routes} from "@/router/router_auth.js";
import {home_routes} from "@/router/router_home.js";
import {error_routes} from "@/router/router_error.js";
import {getAuthUser} from "@/stores/user.js";
import {isDebug} from "@/stores/app.js";

const routes = [
  authorization_routes,
  home_routes,
  error_routes,
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

const validRoutes = ['signIn', 'signUp', 'restore']
const routeTo = "signIn"

router.beforeEach((to, from, next) => {
  if (!isDebug()) {
    return next();
  }
  const user = getAuthUser();
  const isGuestRoute = validRoutes.includes(to.name);
  const isUserExpired = user && user.expireAt < (Date.now() / 1000);

  if ((!user && !isGuestRoute) || (isUserExpired && to.name !== routeTo)) {
    next({name: routeTo});
  } else {
    next();
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
