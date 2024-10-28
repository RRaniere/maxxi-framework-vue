import { getPendingInvoices} from '@/services/shopping/shoppingService';


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
    },
    {
      name: 'Shopping',
      path: '/shopping', 
      component: () => import('@/views/shopping/Shopping.vue'),
      beforeEnter: async (to : any, from :any, next: any) => {
        try {
          const response = await getPendingInvoices(); 
  
          if (response.status) {
            next('/shopping/invoice'); 
          } else {
            next();
          }
        } catch (error) {
          next(); 
        }
      },
    },
    {
      name: 'Invoice',
      path: '/shopping/invoice',
      component: () => import('@/views/shopping/Invoice.vue'),
    },
  ]
};


export default MainRoutes;
