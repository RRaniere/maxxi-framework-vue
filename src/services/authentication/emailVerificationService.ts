import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';


async function requestEmailVerification() { 

    try { 
        const response = await fetchWrapper.post('/user/request-email-verification');
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}


export { requestEmailVerification }