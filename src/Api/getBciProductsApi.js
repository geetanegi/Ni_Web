import { GET_PDF, GET_VIDEOS } from "../Utils/Urls";
import MakeRequest from "../Utils/makeRequest";
const GetPdfApi = async () => {
    return await MakeRequest.get(GET_PDF)
        .then((response) => {
            if (response) {
                return response?.data?.data
            }
        })
        .catch(() => {
            return null;
        });
};
const GetVideosApi = async () => {
    return await MakeRequest.get(GET_VIDEOS)
        .then((response) => {
            if (response) {
                return response?.data?.data
            }
        })
        .catch(() => {
            return null;
        });
};
export { GetPdfApi, GetVideosApi };
