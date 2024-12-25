import MakeRequest from "../Utils/makeRequest";
import { GET_FEEDBACK } from "../Utils/Urls";
const GetFeedbackApi = async (data) => {
    return await MakeRequest.postAuth(GET_FEEDBACK, data)
        .then((response) => {
            let data = {
                rows: response?.data?.data?.rows,
                fields: response?.data?.data?.fields,
                noOfrecords: response?.data?.recordsCount
            }
            return data
        })
        .catch(() => {
            return null;
        });
};
export default GetFeedbackApi;
