import {
   GET_NOTIFICATION,
   GET_NOTIFICATION_SUCCESS,
   GET_NOTIFICATION_FAILURE,
   SET_NOTIFICATION,
   SET_NOTIFICATION_SUCCESS,
   SET_NOTIFICATION_FAILURE
  } from "@utils/actionTypes";
  
  const INIT_STATE = {
    loadingNotification:false,
    getNotification:null,
    settingNotification:false,
    setNotification:null
  };
  
  const notificationReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_NOTIFICATION:
        return { ...state, loadingNotification: true };
      case GET_NOTIFICATION_SUCCESS:
        return { ...state, getNotification: action.payload, loadingNotification: false };
      case GET_NOTIFICATION_FAILURE:
        return { ...state, getNotification: action.payload, loadingNotification: false };
  
      case SET_NOTIFICATION:
        return { ...state, settingNotification: true };
      case SET_NOTIFICATION_SUCCESS:
        return {
          ...state,
          setNotification: action.payload,
          settingNotification: false,
        };
      case SET_NOTIFICATION_FAILURE:
        return {
          ...state,
          setNotification: action.payload,
          settingNotification: false,
        };
  
      default:
        return state;
    }
  };
  export default notificationReducer;
  