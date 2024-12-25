import MakeRequest from "../Utils/makeRequest";
import { ACTIVATE_USER, DEACTIVATE_USER } from "../Utils/Urls";
import { notification } from "antd";

const activateAndDeactivateUser = (isActive, id, navigate) => {
    MakeRequest.postParam(isActive ? DEACTIVATE_USER : ACTIVATE_USER, {}, id)
        .then((response) => {
            if (response?.status === 200) {
                isActive ? notification.success({ message: 'User has been Deactivated Successfully', duration: 5 }) : notification.success({ message: 'User has been Activated Successfully', duration: 5 })
                navigate(`/user-details/${id}`);
            }
        })
        .catch((e) => {
            console.log("Error @activateAndDeactivateUser", e);
            notification.error({
                message: "you don't have permission to perform this action",
                duration: 5,
            });
        });
};
export default activateAndDeactivateUser;
