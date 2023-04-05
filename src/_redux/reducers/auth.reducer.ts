/* eslint-disable eslint-comments/disable-enable-pair */
import AuthConstant from '_redux/constants/auth.constant';

const initialState = {
  isAuthenticated: false,
  failedCount: 1,
  failedDate: new Date(),
  authData: {}
};
const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case AuthConstant.LOGIN:
      state = {
        ...state,
        isAuthenticated: true,
        authData: action.payload,
        failedCount: 0
      };
      return state;
    case AuthConstant.LOGIN_FAILED:
      state = {
        ...state,
        failedCount: (state.failedCount || 1) + 1,
        failedDate: new Date()
      };
      return state;
    case AuthConstant.RESET_COUNT:
      state = {
        ...state,
        failedCount: 1,
        failedDate: new Date()
      };
      return state;
    case AuthConstant.LOGOUT:
      state = initialState;
      return state;
    default:
      return state;
  }
};

export default authReducer;
