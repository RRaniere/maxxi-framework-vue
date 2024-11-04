import { useAuthStore } from '@/stores/auth';

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  delete: request('DELETE')
};

interface temp {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

interface UserData {
  username: string;
  password: string;
}

function request(method: string) {
  return (url: string, body?: object) => {
    const requestOptions: temp = {
      method,
      headers: authHeader(url)
    };
    requestOptions.headers['Content-Type'] = 'application/json';
    requestOptions.headers['Accept'] = 'application/json';
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(import.meta.env.VITE_API_URL + url, requestOptions).then(handleResponse);
  };
}


function authHeader(url: string): Record<string, string> {

  // return auth header with jwt if user is logged in and request is to the api url
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;

  if (isLoggedIn) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response: Response) {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();
      if ([401, 403].includes(response.status) && user) {
        logout();
        return;
      }

      const error: string = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    // Ensure data is of type UserData
    return data;
  });
}
