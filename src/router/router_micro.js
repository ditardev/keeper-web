export const micro_routes = {
  path: "/micro",
  name: 'Micro',
  component: () => import('@/layouts/Main.vue'),
  children: [
    {
      path: 'panda',
      name: 'PandaPage',
      component: () => import('@/pages/micro/PandaPage.vue'),
    },
    {
      path: 'events',
      name: 'EventsPage',
      component: () => import('@/pages/micro/EventsPage.vue'),
    },
  ]
}
