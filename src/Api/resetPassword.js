import MakeRequest from "../Utils/makeRequest";
import { notification } from "antd";
const resetPassword = async (data) => {
    MakeRequest.postAuth(`/user/password/${data?.id}`, {
        Password: data?.password,
    }).then(() => {
        notification.success({ message: "Password has been changed successfully", duration: 5 })
    })
        .catch((err) => {
            notification.error({
                message: err?.data?.description,
                duration: 5,
            });
        });
}
export default resetPassword