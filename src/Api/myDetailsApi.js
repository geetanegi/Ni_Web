import MakeRequest from "../Utils/makeRequest";
import { LOGGED_USER } from "../Utils/Urls";
import { SET_LOGGED_USER } from "../Action/index";
import { store } from "../store";
import { HasPermission, PERMISSION } from "../Utils/enum";
const myDetailsApi = (navigate) => {
    MakeRequest.getAuth(LOGGED_USER)
        .then((response) => {
            (HasPermission(response?.data?.data?.Permissions
                , PERMISSION.CanAccessUserManagement)) ? navigate("/users") : navigate("/change-password");
            if (response) {
                store?.dispatch({
                    type: SET_LOGGED_USER,
                    payload: response?.data?.data,
                })
            }
        })
        .catch(() => {
            return null;
        });
};
export default myDetailsApi;
