import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import type { IPersonalData } from '@/interfaces/IPersonalData';

async function updatePersonalData(data: IPersonalData, otp:number) { 

    const { firstname, lastname, email } = data;

    try { 
        const response = await fetchWrapper.post('/profile/personal-data', { firstname, lastname, email, otp });
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }

}

async function updateFinancialData(data : any, otp:number) { 

    try { 
        const response = await fetchWrapper.post('/profile/financial-data', { data,otp });
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }


}


export { updatePersonalData, updateFinancialData}