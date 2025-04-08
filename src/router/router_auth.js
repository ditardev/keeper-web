export const authorization_routes = {
    path: "/",
    name: 'auth',
    component: () => import('@/pages/AuthPage.vue'),
    children: [
        // {
        //     path: '/',
        //     name: 'login',
        //     component: () => import('@/components/auth/LoginView.vue'),
        // },
        // {
        //     path: '/signin',
        //     name: 'signin',
        //     component: () => import('@/components/auth/SigninView.vue'),
        // }
    ]
}