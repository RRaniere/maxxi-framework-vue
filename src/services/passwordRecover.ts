import axios from 'axios';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

// Função para verificar os dados de registro
export async function requestRecover(username: string) {
  try {
    const response = await axios.post(`${baseUrl}/password-recover/request`, {username: username});
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error');
  }
}

export async function recover(password: string, token: string) {
  try {
    const response = await axios.post(`${baseUrl}/password-recover/recover`, {password, token});
    return response.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error');
  }
}
