const MainRoutes = {
  path: '/',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/dashboard/DashboardLayout.vue'),
  children: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      component: () => import('@/views/dashboards/Dashboard.vue')
    },
    {
      name: 'Network',
      path: '/network/:username?', 
      component: () => import('@/views/network/Network.vue'),
      props: true 
    }
  ]
};


export default MainRoutes;
