import MakeRequest from "../Utils/makeRequest";
import { GET_CHILD_DETAILS } from "../Utils/Urls";
const GetChildApi = async (value) => {
    const data = {
        SearchText: value,
        SortBy: "ChildName",
        RecordsPerPage: 1000, //temp fix make it dynamic
        PageNo: 0
    }
    return await MakeRequest.postAuth(GET_CHILD_DETAILS, data)
        .then((response) => {
            return response?.data?.data
        })
        .catch(() => {
            return null;
        });
};
export default GetChildApi;
