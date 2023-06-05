import { LOGOUT } from "@utils/actionTypes";
import {
  removeToken,
  removePermissions,
  removeUserData,
} from "@utils/commonFunctions";

const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT:
      removePermissions();
      removeToken();
      removeUserData();
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default logoutReducer;
