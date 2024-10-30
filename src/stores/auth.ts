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
    async login(username: string, password: string, totp: number | null = null) {

      const user = await fetchWrapper.post(`/login`, { username, password, totp }); 
      if(user.status && user.two_factor_enabled) { 
        return user
      }
      if(user.status) { 
        // update pinia state
        this.user = user;
        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/dashboard');
      }

      return true
     
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
    },
    updateFinancialData(data: { btcAddress: string; usdtAddress: string; ethAddress: string }) {
      this.user.user.btc_address = data.btcAddress;
      this.user.user.usdt_address = data.usdtAddress;
      this.user.user.eth_address  = data.ethAddress;

      localStorage.setItem('user', JSON.stringify(this.user));
    },
    updateTwoFa(two_factor_enabled:boolean) { 
      this.user.user.two_factor_enabled = two_factor_enabled
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }
});
