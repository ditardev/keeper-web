export const home_routes = {
  path: "/home",
  name: 'Home',
  component: () => import('@/layouts/Main.vue'),
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('@/pages/HomePage.vue'),
    },

    {
      path: 'test',
      name: 'TestPage',
      component: () => import('@/pages/TestPage.vue'),
    },
  ]
}
