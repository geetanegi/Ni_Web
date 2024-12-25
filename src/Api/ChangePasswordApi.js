import Cookies from "js-cookie";
import MakeRequest from "../Utils/makeRequest";
import { CHANGE_PASSWORD } from "../Utils/Urls";
import { notification } from "antd";
const ChangePasswordApi = (data, navigate) => {
    MakeRequest.putAuth(CHANGE_PASSWORD, data)
        .then((response) => {
            if (response?.status === 200) {
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
                    notification.success({ message: 'Password has been changed Successfully' })
                    navigate("/users");
                } else {
                    notification.error({
                        message: "please enter correct password",
                        duration: 5,
                    });
                }

            }
        })
        .catch((err) => {
            notification.error({
                message: "please enter correct password",
                duration: 5,
            });
        });
};
export default ChangePasswordApi;
