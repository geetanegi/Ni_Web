import MakeRequest from "../Utils/makeRequest";
import { GET_CHECKLIST } from "../Utils/Urls";
const checklistApi = async () => {
    return await MakeRequest.get(GET_CHECKLIST)
        .then((response) => {
            if (response) {
                return response?.data?.data
            }
        })
        .catch(() => {
            return null;
        });
};
export default checklistApi;
