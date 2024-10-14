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
      name: 'Password Recover',
      path: '/password-recover',
      component: () => import('@/views/authentication/recover/PasswordRecover.vue')
    },
    {
      name: 'Code Verification',
      path: '/code-verification',
      component: () => import('@/views/authentication/login/CodeVerification.vue')
    },
  ]
};

export default AuthRoutes;
