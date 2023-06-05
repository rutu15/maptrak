import {
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  SET_PROFILE,
  SET_PROFILE_SUCCESS,
  SET_PROFILE_FAILURE,
  PROFILE_VERIFY_EMAIL,
  PROFILE_VERIFY_EMAIL_SUCCESS,
  PROFILE_VERIFY_EMAIL_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  gettingProfile: false,
  getProfileData: null,
  settingProfile: false,
  setProfileData: null,
  verifyingProfileEmail: false,
  verifiedProfileEmailData: null,
};

const ProfileReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, gettingProfile: true };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        getProfileData: action.payload,
        gettingProfile: false,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        getProfileData: action.payload,
        gettingProfile: false,
      };

    case SET_PROFILE:
      return { ...state, settingProfile: true };
    case SET_PROFILE_SUCCESS:
      return {
        ...state,
        setProfileData: action.payload,
        settingProfile: false,
      };
    case SET_PROFILE_FAILURE:
      return {
        ...state,
        setProfileData: action.payload,
        settingProfile: false,
      };

    case PROFILE_VERIFY_EMAIL:
      return { ...state, verifyingProfileEmail: true };
    case PROFILE_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifiedProfileEmailData: action.payload,
        verifyingProfileEmail: false,
      };
    case PROFILE_VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        verifiedProfileEmailData: action.payload,
        verifyingProfileEmail: false,
      };
    default:
      return state;
  }
};
export default ProfileReducer;
