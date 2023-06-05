import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from "@utils/actionTypes";
import {
  setToken,
  setPermissions,
  setUserData,
  setUserId,
} from "@utils/commonFunctions";

const INIT_STATE = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

const loginReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: false, loading: true };
    case LOGIN_SUCCESS:
      setToken(action.payload.data.token);
      setPermissions(action.payload.data.permissions);
      setUserData(action.payload.data.name);
      setUserId(action.payload.data.id);
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
export default loginReducer;
