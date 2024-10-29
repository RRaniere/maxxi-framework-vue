import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export async function verifyRegisterData(userData: any) {
  try {
    const response = await axios.post(`${baseUrl}/register/verify-register-data`, userData);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error verifying register data');
  }
}

export async function requestEmailVerification(userData: any) {
  try {
    const response = await axios.post(`${baseUrl}/request-email-verification`, userData);
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error requesting email verification');
  }
}
