/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  loginAction,
  logoutAction,
  resetCount
} from '_redux/actions/auth.action';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import LoginService from 'services/login.service';
import { _storeLocalStorageItem } from 'utils/localStorage';

const useAuth = () => {
  const dispatch = useDispatch();
  const loginService = LoginService();

  const { failedCount, failedDate } = useSelector(
    (state: any) => state.authReducer
  );

  const login = async (data: any) => {
    if (failedCount >= 5) {
      const diffInMinutes =
        (new Date().getTime() - new Date(failedDate).getTime()) / 60000;
      if (!(diffInMinutes > 1)) {
        return Toast.show({
          type: 'error',
          text1: 'Maaf',
          text2: 'Kamu sudah mencoba sebanyak 5x, coba lagi dalam 30 menit'
        });
      } else {
        dispatch(resetCount());
      }
    }
    return loginService
      .login(data)
      .then(async ({ data }) => {
        await _storeLocalStorageItem({
          storageKey: 'UserToken',
          storageValue: data?.token
        });
        dispatch(loginAction(data));
        return data;
      })
      .catch((error) => {
        if (error?.response?.status === 429) {
          Toast.show({
            type: 'error',
            text1: 'Maaf',
            text2: `Terlalu Banyak Percobaan, Mohon Tunggu Selama ${Math.floor(
              (error?.response?.data?.waiting_second || 0) / 60
            )} menit`
          });
        } else if (error?.response?.status === 404) {
          Toast.show({
            type: 'error',
            text1: 'Maaf',
            text2: 'Akun tidak ditemukan'
          });
        }
        throw error;
      });
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    login,
    logout
  };
};

export default useAuth;
