import { defineStore } from 'pinia';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { getPasskeys, removePasskey, registerPasskey, savePasskey } from '@/services/profile/passkeyService';
import { startRegistration } from '@simplewebauthn/browser'

interface Passkey {
    created_at: string,
    created_at_human: string,
    name: string
  }

export const usePasskeyStore = defineStore('passkey', {
  state: () => ({
    passkeys: [] as Passkey[],
  }),
  actions: {
    async fetchPasskeys() {
      this.passkeys = await getPasskeys().then(res => res.passkeys);
    },
    async removePasskey(name :string) {
      const response = await removePasskey(name)
      if(response.status) { 
        this.passkeys = this.passkeys.filter(passkey => passkey.name !== name);
      }
      return response;

    },
    async addPasskey(name :string) {
        const register = await registerPasskey(name)
        const options = {
            optionsJSON: register
        };
        try {
            const passkey = await startRegistration(options);
            const save = await savePasskey(name, JSON.stringify(passkey), JSON.stringify(register))
            if(save.status) { 
                this.passkeys.unshift({
                    created_at: "Just now",
                    created_at_human: "Just now",
                    name: save.passkey.name
                });
              }
            return save;
            
        } catch (e) {
            return;
        }

      },
  },
});
