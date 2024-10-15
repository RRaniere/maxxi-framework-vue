const AuthRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/authentication/login/Login.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/authentication/register/Register.vue')
    },
    {
      path: '/password-recover',
      component: () => import('@/views/authentication/recover/PasswordRecover.vue'), 
      children: [
        {
          path: '', 
          component: () => import('@/views/authentication/recover/PasswordRecoverForm.vue') 
        },
        {
          path: ':token', 
          component: () => import('@/views/authentication/recover/PasswordResetForm.vue') 
        }
      ]
    },
  ]
};

export default AuthRoutes;
