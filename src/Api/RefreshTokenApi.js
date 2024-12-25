import Cookies from "js-cookie";
import MakeRequest from "../Utils/makeRequest";
import { REFRESH_TOKEN } from "../Utils/Urls";
import { clearData } from "./loginApi";

const refreshTokenApi = (refreshToken) => {
  clearData();
  const data = {
    refreshToken: refreshToken
  }
  MakeRequest.postAuth(REFRESH_TOKEN, data)
    .then((response) => {
      if (response?.data?.data?.accessToken && response?.data?.data?.refreshToken) {
        sessionStorage.setItem(
          "accessToken",
          response?.data?.data?.accessToken
        );
        sessionStorage.setItem(
          "refreshToken",
          response?.data?.data?.refreshToken
        )
        Cookies.set('accessToken', response?.data?.data?.accessToken)
        Cookies.set('refreshToken', response?.data?.data?.refreshToken)
      }
    })
    .catch(() => {
      return null;
    });
};
export default refreshTokenApi;
