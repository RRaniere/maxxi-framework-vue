import { defineStore } from 'pinia';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { getPasskeys, removePasskey, addPasskey } from '@/services/profile/passkeyService';

interface Passkey {
    created_at: string,
    created_at_human: string,
    data: object,
    credential_id: string;
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
    async deletePasskey(credentialId :string) {
      const response = await removePasskey(credentialId)
      if(response.status) { 
        this.passkeys = this.passkeys.filter(passkey => passkey.credential_id !== credentialId);
      }
      return response;

    },
    async addPasskey(name :string) {
        const response = await addPasskey(name)
        if(response.status) { 
            this.passkeys.push(response.passkey);
        }
        return response;
      },
  },
});
