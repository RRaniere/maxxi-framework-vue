import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(username: string, password: string) {

      const user = await fetchWrapper.post(`/login`, { username, password });
      // update pinia state
      this.user = user;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard');
    },
    async logout() {

      const logout = await fetchWrapper.post(`/logout`);

      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    },
    updateUserData(data: { firstName: string; lastName: string; email: string }) {
        this.user.user.first_name = data.firstName;
        this.user.user.last_name = data.lastName;
        this.user.user.email = data.email;

        localStorage.setItem('user', JSON.stringify(this.user));

    }
  }
});
