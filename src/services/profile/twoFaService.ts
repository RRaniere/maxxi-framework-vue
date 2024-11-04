import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

async function requestTwoFaCredentials(otp:number) { 

    try { 
        const response = await fetchWrapper.post('/profile/request-two-factor-credentials', {otp});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}

async function enableTwoFa(secret:string) { 

    try { 
        const response = await fetchWrapper.post('/profile/enable-two-factor', {secret});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
}


async function disableTwoFa(otp:number) { 

    try { 
        const response = await fetchWrapper.post('/profile/disable-two-factor', {otp});
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export { requestTwoFaCredentials, enableTwoFa, disableTwoFa}