import { defineStore } from 'pinia';

interface UserData {
  firstname: string;
  lastname: string;
  email: string;

}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    userData: {
        firstname: '',
        lastname: '',
        email: ''
    },
  }),
  actions: {
    setUserData(data: UserData) {
      this.userData = data;
    },
    clearUserData() {
      this.userData = {
        firstname: '',
        lastname: '',
        email: '',
      };
    },
  },
});
