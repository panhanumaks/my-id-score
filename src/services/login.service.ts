import CONFIG from 'config';
import { axiosInstance } from 'utils/axiosInstance';

const LoginService = () => {
  const login = ({ email, password }: { email: string; password: string }) => {
    return axiosInstance.post(
      '/login',
      JSON.stringify({
        email,
        password
      })
    );
  };

  const confirmPin = ({ pin }: { pin: string }) => {
    return axiosInstance.post(
      '/confirm-pin',
      JSON.stringify({
        pin
      })
    );
  };

  const loginGoogle = ({ id_token }: { id_token: string }) => {
    return axiosInstance.post(
      '/google/login',
      JSON.stringify({
        client_id: CONFIG.CLIENT_ID,
        id_token
      })
    );
  };

  const registerGoogle = ({ id_token }: { id_token: string }) => {
    return axiosInstance.post(
      '/google/register',
      JSON.stringify({
        client_id: CONFIG.CLIENT_ID,
        id_token
      })
    );
  };

  return {
    login,
    confirmPin,
    loginGoogle,
    registerGoogle
  };
};

export default LoginService;
