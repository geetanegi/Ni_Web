import { RESET_USER_DETAILS } from "../Action";
import { store } from "../store";
import MakeRequest from "../Utils/makeRequest";
import { LOGIN } from "../Utils/Urls";
import { notification } from "antd";
import myDetailsApi from "./myDetailsApi";
import Cookies from "js-cookie";
export const clearData = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  store?.dispatch({
    type: RESET_USER_DETAILS,
  });
};
const LoginApi = ({ loginData, remember, navigate }, cb) => {
  clearData();
  const data = {
    phoneNumber: loginData?.userName,
    password: loginData?.password,
    deviceId: "web",
    deviceName: "Web",
  };

  MakeRequest.post(LOGIN, data)
    .then((response) => {
      if (
        response?.data?.data?.accessToken &&
        response?.data?.data?.refreshToken
      ) {
        Cookies.set(
          "accessToken",
          response?.data?.data?.accessToken
        );
        Cookies.set(
          "refreshToken",
          response?.data?.data?.refreshToken
        );

        if (localStorage.username && localStorage.username !== "undefined" && localStorage.password && localStorage.password !== "undefined" && !remember) {
          if ((loginData?.userName === localStorage?.username) && (loginData?.password === localStorage?.password)) {
            localStorage.removeItem('username');
            localStorage.removeItem('password')
          }
        }
        myDetailsApi(navigate);
      } else {
        notification.error({
          message: response?.data?.message || "Incorrect username OR password",
          duration: 5,
        });
      }
    })
    .catch((err) => {
      notification.error({
        message: err?.data?.description || "Incorrect username OR password",
        duration: 5,
      });
      return null;
    }).finally(() => {
      cb && cb()
    })
};
export default LoginApi;
