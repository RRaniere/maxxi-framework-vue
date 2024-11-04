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

async function removePasskey(name : string) { 

    try { 
        const response = await fetchWrapper.post('/profile/passkey/remove', {name});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }

}


async function registerPasskey(name : string) { 

    try { 
        const response = await fetchWrapper.post('/profile/passkey/register', {name});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }

}

async function savePasskey(name : string, passkey: string, options : string) { 

    try { 
        const response = await fetchWrapper.post('/profile/passkey/save', {name, passkey, options});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }

}

async function getAuthenticateOptions(username: string) { 

    try { 
        const response = await fetchWrapper.post('/passkey/authenticate-options', {username});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }

}


async function authenticate(answer: string, options:string) { 

    try { 
        const response = await fetchWrapper.post('/login/passkey/authenticate', {answer, options});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export { getPasskeys, removePasskey, registerPasskey, savePasskey, getAuthenticateOptions, authenticate }