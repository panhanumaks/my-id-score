import AuthConstant from '_redux/constants/auth.constant';

const loginAction = (data: any) => {
  return {
    type: AuthConstant.LOGIN,
    payload: data
  };
};

const logoutAction = () => {
  return {
    type: AuthConstant.LOGOUT
  };
};

const loginFailed = () => {
  return {
    type: AuthConstant.LOGIN_FAILED
  };
};

const resetCount = () => {
  return {
    type: AuthConstant.RESET_COUNT
  };
};

export { loginAction, loginFailed, logoutAction,resetCount };
