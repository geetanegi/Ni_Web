import MakeRequest from "../Utils/makeRequest";
import { GET_RECORDS } from "../Utils/Urls";
import { notification } from "antd";
const GetRecordsApi = async (data) => {
    return await MakeRequest.postAuth(GET_RECORDS, data)
        .then((response) => {
            if (response) {
                return response?.data?.data
            }
        })
        .catch((err) => {
            notification.error({
                message: err?.data?.description + " , ",
                duration: 5,
            });
        });
};
export default GetRecordsApi;
