import MakeRequest from "../Utils/makeRequest";
import { LOGOUT } from "../Utils/Urls";
import { RESET_STATE } from "../Action/index";
import { store } from "../store";
import Cookies from "js-cookie";
const logoutApi = () => {
  MakeRequest.postAuth(LOGOUT)
    .then((response) => {
      if (response?.status === 200) {
        store.dispatch({
          type: RESET_STATE,
        });
      }
    })
    .catch(() => {
      return null;
    })
    .finally(() => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.replace(
        `${window.location.origin}${window.location.pathname}#/login`
      );
    });
};
export default logoutApi;
