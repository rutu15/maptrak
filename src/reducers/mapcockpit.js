import {
  GET_MAPCOCKPIT,
  GET_MAPCOCKPIT_SUCCESS,
  GET_MAPCOCKPIT_FAILURE,
} from "@utils/actionTypes";

const INIT_STATE = {
  loadingMapcockpit: false,
  mapcockpitData: null,
};

const MapcockpitReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MAPCOCKPIT:
      return { ...state, loadingMapcockpit: true };
    case GET_MAPCOCKPIT_SUCCESS:
      return {
        ...state,
        mapcockpitData: action.payload,
        loadingMapcockpit: false,
      };
    case GET_MAPCOCKPIT_FAILURE:
      return {
        ...state,
        mapcockpitData: action.payload,
        loadingMapcockpit: false,
      };
    default:
      return state;
  }
};
export default MapcockpitReducer;
