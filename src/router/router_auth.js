export const authorization_routes = {
  path: "/",
  name: 'auth',
  component: () => import('@/pages/AuthPage.vue'),
  children: [
    {
      path: '/',
      name: 'signIn',
      component: () => import('@/components/auth/ui/SignInView.vue'),
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('@/components/auth/ui/SignUpView.vue'),
    },
    {
      path: '/restore',
      name: 'restore',
      component: () => import('@/components/auth/ui/RestoreView.vue'),
    },
  ]
}