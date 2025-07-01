export const home_routes = {
  path: "/home",
  name: 'Home',
  component: () => import('@/layouts/Main.vue'),
  children: [
    {
      path: '/home',
      name: 'HomePage',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/panda',
      name: 'PandaPage',
      component: () => import('@/pages/micro/PandaPage.vue'),
    },
    {
      path: '/test',
      name: 'TestPage',
      component: () => import('@/pages/TestPage.vue'),
    },
  ]
}
