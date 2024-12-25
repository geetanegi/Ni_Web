import { GET_PDF, GET_VIDEOS } from "../Utils/Urls";
import MakeRequest from "../Utils/makeRequest";
import { notification } from "antd";
const ActiveBciProductsApi = async () => {
    return await MakeRequest.get(GET_PDF)
        .then((response) => {
            if (response) {
                notification.success({ message: 'User has been Activated Successfully', duration: 5 })
            }
        })
        .catch((err) => {
            notification.error({
                message: err?.data?.description || "you don't have permission to perform this action",
                duration: 5,
            });
        });
};
const DeactivateBciProductsApi = async () => {
    return await MakeRequest.get(GET_VIDEOS)
        .then((response) => {
            if (response) {
                notification.success({ message: 'User has been Deactivated Successfully', duration: 5 })
            }
        })
        .catch((err) => {
            notification.error({
                message: err?.data?.description || "you don't have permission to perform this action",
                duration: 5,
            });
        });
};
export { ActiveBciProductsApi, DeactivateBciProductsApi };
