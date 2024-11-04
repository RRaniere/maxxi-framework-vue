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
    updateUserData(data: UserData) {
      this.userData = data;
    }
   
  },
});
