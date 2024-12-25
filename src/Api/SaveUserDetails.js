import MakeRequest from "../Utils/makeRequest";
import { SAVE_USER } from "../Utils/Urls";
import { notification } from "antd";
const SaveUserDetails = (data, passwordData, navigate) => {
    MakeRequest.postAuth(SAVE_USER, data)
        .then((response) => {
            if (response?.status === 200 && response?.data?.data) {
                MakeRequest.postAuth(`/user/password/${response?.data?.data?.userId}`, {
                    Password: passwordData.newPassword,
                }).then(() => {
                    notification.success({ message: "User has been Created Successfully", duration: 5 })
                    navigate("/users");
                })
            }
        })
        .catch((err) => {
            notification.error({
                message: err?.data?.description || "please enter correct user Details",
                duration: 5,
            });
        });
};
export default SaveUserDetails;
