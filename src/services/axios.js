import axios from "axios";

import {
  getToken,
  removeToken,
  removePermissions,
  removeUserData,
} from "@utils/commonFunctions";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
        removeToken();
        removePermissions();
        removeUserData();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
