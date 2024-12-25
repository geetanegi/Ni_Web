import MakeRequest from "../Utils/makeRequest";
import { GET_ROLES } from "../Utils/Urls";
import { SET_USER_ROLES } from "../Action/index";
import { store } from "../store";


const GetRolesApi = async () => {
    return await MakeRequest.get(GET_ROLES)
        .then((response) => {
            if (response) {
                store?.dispatch({
                    type: SET_USER_ROLES,
                    payload: response?.data?.data,
                });
            }
            return response?.data?.data
        })
        .catch(() => {
            return null;
        });
};
export default GetRolesApi;
