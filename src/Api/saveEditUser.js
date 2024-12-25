import MakeRequest from "../Utils/makeRequest";
import { SAVE_EDIT_USER } from "../Utils/Urls";

import { notification } from "antd";
const saveEditUserApi = (data, id, navigate) => {
    MakeRequest.put(SAVE_EDIT_USER, data, id)
        .then((response) => {
            if (response?.status === 200) {
                notification.success({ message: "User has been Modified Successfully", duration: 5 })
                navigate("/users");
            }
        })
        .catch(() => {
            notification.error({
                message: "please enter correct user Details",
                duration: 5,
            });
        });
};
export default saveEditUserApi;
