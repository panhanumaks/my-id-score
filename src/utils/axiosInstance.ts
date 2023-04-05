/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig
} from 'axios';
import CONFIG from 'config';
import {
  _retrieveLocalStorageItem,
  _storeLocalStorageItem
} from 'utils/localStorage';

interface ResponseRefreshToken {
  access_token?: string;
  refresh_token?: string;
  message: string;
  error: boolean;
}

const GetRefreshToken = async ({
  token
}: {
  token: string;
}): Promise<ResponseRefreshToken> =>
  new Promise((resolve, reject) => {
    fetch(`${CONFIG.BASE_URL}/refresh_token`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res: ResponseRefreshToken) =>
        resolve(res)
      )
      .catch((err) => {
        // removeUserAuth();
        return reject(err);
      });
  });

export const syncRefreshToken =
  async (): Promise<ResponseRefreshToken> => {
    const refreshTokenCookie =
      await _retrieveLocalStorageItem(
        'UserRefreshToken'
      );

    if (refreshTokenCookie) {
      const {
        access_token,
        refresh_token,
        error
      } = await GetRefreshToken({
        token: refreshTokenCookie
      });

      if (
        !error &&
        access_token &&
        refresh_token
      ) {
        await _storeLocalStorageItem({
          storageKey: 'UserToken',

          storageValue: access_token
        });
        await _storeLocalStorageItem({
          storageKey: 'UserRefreshToken',

          storageValue: refresh_token
        });

        return {
          access_token,

          refresh_token,
          message: '',
          error: false
        };
      } else {
        // removeUserAuth();
      }
    } else {
      // removeUserAuth();
    }

    return {
      message: 'error',
      error: true
    };
  };

export const axiosBaseConfigOptions: AxiosRequestConfig =
  {
    headers: {
      'X-Session-Token': '<string>',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    timeout: 30000
  };

export const axiosInterceptorRequest = async (
  headerConfig: AxiosRequestConfig
) => {
  const token = await _retrieveLocalStorageItem(
    'UserToken'
  );
    
  if (token && headerConfig.headers) {
    headerConfig.headers.Authorization = `Bearer ${token}`;
  }

  headerConfig.headers = {
    ...headerConfig.headers
  };

  console.log('url : ', headerConfig.url);
  console.log('params : ', headerConfig.params);
  console.log('data : ', headerConfig.data);

  return headerConfig;
};

export const axiosInterceptorResponseError =
  async ({
    error
  }: {
    error: AxiosError;
    instance: AxiosInstance;
  }) => {
    const status = error.response
      ? error.response.status
      : null;
    const errorConfig = error.config as any;

    console.log(
      'response [error] : ',
      JSON.stringify(error.response?.data)
    );
    if (status === 406) {
      return syncRefreshToken()
        .then(
          ({
            access_token,
            error: syncError
          }) => {
            if (
              !syncError &&
              access_token &&
              errorConfig.headers
            ) {
              errorConfig.headers.Authorization = `Bearer ${access_token}`;
            }
          }
        )
        .finally(() => {
          axios.request(errorConfig);
        });
    }
    return Promise.reject(error);
  };

const instanceAuthOption: AxiosRequestConfig = {
  ...axiosBaseConfigOptions,
  baseURL: CONFIG.BASE_URL
};
export const axiosInstance = axios.create(
  instanceAuthOption
);

axiosInstance.interceptors.request.use(
  axiosInterceptorRequest as any
);
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      'response [success] : ',
      JSON.stringify(response.data)
    );
    return response;
  },
  (error) =>
    axiosInterceptorResponseError({
      error,
      instance: axiosInstance
    })
);
