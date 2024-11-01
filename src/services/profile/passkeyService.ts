import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';


async function getPasskeys() { 

    try { 
        const response = await fetchWrapper.get('/profile/passkey/get');
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}

async function removePasskey(credentialId : string) { 

    try { 
        const response = await fetchWrapper.post('/profile/passkey/remove', {credentialId});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}


async function addPasskey(name : string) { 

    try { 
        const response = await fetchWrapper.post('/profile/passkey/add', {name});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}

export { getPasskeys, removePasskey, addPasskey }