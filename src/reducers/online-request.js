import {
  FETCH_ONLINE_REQUEST,
  FETCH_ONLINE_REQUEST_SUCCESS,
  FETCH_ONLINE_REQUEST_FAILURE,
  ACKNOWLEDGE_REQUEST,
  ACKNOWLEDGE_REQUEST_SUCCESS,
  ACKNOWLEDGE_REQUEST_FAILURE,
  GET_ONLINE_REQUEST_BY_ID,
  GET_ONLINE_REQUEST_BY_ID_SUCCESS,
  GET_ONLINE_REQUEST_BY_ID_FAILURE,
  GET_ONLINE_REQUEST_CHAT,
  GET_ONLINE_REQUEST_CHAT_SUCCESS,
  GET_ONLINE_REQUEST_CHAT_FAILURE,
  SAVE_ONLINE_REQUEST_CHAT,
  SAVE_ONLINE_REQUEST_CHAT_SUCCESS,
  SAVE_ONLINE_REQUEST_CHAT_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingOnlineRequest: false,
  onlineRequestData: null,
  acknowledgingRequest: false,
  acknowledgeRequestData: null,
  gettingOnlineRequestById: false,
  getOnlineRequestById: null,
  loadingOnlineRequestChat: false,
  onlineRequestChats: null,
  savingChat: false,
};

const OnlineRequestReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_ONLINE_REQUEST:
      return { ...state, loadingOnlineRequest: true };
    case FETCH_ONLINE_REQUEST_SUCCESS:
      return {
        ...state,
        onlineRequestData: action.payload,
        loadingOnlineRequest: false,
      };
    case FETCH_ONLINE_REQUEST_FAILURE:
      return {
        ...state,
        onlineRequestData: action.payload,
        loadingOnlineRequest: false,
      };

    case ACKNOWLEDGE_REQUEST:
      return { ...state, acknowledgingRequest: true };
    case ACKNOWLEDGE_REQUEST_SUCCESS:
      return {
        ...state,
        acknowledgeRequestData: action.payload,
        acknowledgingRequest: false,
      };
    case ACKNOWLEDGE_REQUEST_FAILURE:
      return {
        ...state,
        acknowledgeRequestData: action.payload,
        acknowledgingRequest: false,
      };

    case GET_ONLINE_REQUEST_BY_ID:
      return { ...state, gettingOnlineRequestById: true };
    case GET_ONLINE_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        getOnlineRequestById: action.payload,
        gettingOnlineRequestById: false,
      };
    case GET_ONLINE_REQUEST_BY_ID_FAILURE:
      return {
        ...state,
        getOnlineRequestById: action.payload,
        gettingOnlineRequestById: false,
      };

    case GET_ONLINE_REQUEST_CHAT:
      return {
        ...state,
        loadingOnlineRequestChat: true,
      };
    case GET_ONLINE_REQUEST_CHAT_SUCCESS:
      return {
        ...state,
        onlineRequestChats: action.payload,
        loadingOnlineRequestChat: false,
      };
    case GET_ONLINE_REQUEST_CHAT_FAILURE:
      return {
        ...state,
        onlineRequestChats: action.payload,
        loadingOnlineRequestChat: false,
      };

    case SAVE_ONLINE_REQUEST_CHAT:
      return {
        ...state,
        savingChat: true,
      };
    case SAVE_ONLINE_REQUEST_CHAT_SUCCESS:
      return {
        ...state,
        savingChat: false,
      };
    case SAVE_ONLINE_REQUEST_CHAT_FAILURE:
      return {
        ...state,
        savingChat: false,
      };

    default:
      return state;
  }
};
export default OnlineRequestReducer;
