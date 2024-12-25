import { GET_ALL_BCI_PRODUCT } from "../Utils/Urls";
import MakeRequest from "../Utils/makeRequest";
import { store } from "../store";
import { SET_BCI_PRODUCT_DATA } from "../Action/index";
const bciProductApi = async (data, key) => {
    return await MakeRequest.postAuth(GET_ALL_BCI_PRODUCT,data.Filters)
        .then((response) => {
            if (response) {
                store?.dispatch({
                    type: SET_BCI_PRODUCT_DATA,
                    payload: response?.data,
                });
            }
            return response?.data
        })
        .catch(() => {
            return null;
        });
};
export default bciProductApi;
