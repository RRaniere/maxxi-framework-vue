import { defineStore } from 'pinia';

interface UserData {
  username: string;
  email: string;
  password: string;
  sponsor: string;
  firstname: string;
  lastname: string;
}

export const useRegisterStore = defineStore('register', {
  state: () => ({
    userData: {
      username: '',
      email: '',
      password: '',
      sponsor: '',
      firstname: '',
      lastname: '',
    },
  }),
  actions: {
    setUserData(data: UserData) {
      this.userData = data;
    },
    clearUserData() {
      this.userData = {
        username: '',
        email: '',
        password: '',
        sponsor: '',
        firstname: '',
        lastname: '',
      };
    },
  },
});
