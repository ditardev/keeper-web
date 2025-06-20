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
    ]
}