import MakeRequest from "../Utils/makeRequest";
import { GET_BENEFICIARY_STATE, GET_STATE } from "../Utils/Urls";
import { SET_USER_STATE } from "../Action/index";
import { store } from "../store";

const GetStateApi = async () => {
  return await MakeRequest.getBeneficiaryAuthe(GET_BENEFICIARY_STATE)
    .then((response) => {
      if (response) {
        store?.dispatch({
          type: SET_USER_STATE,
          payload: response?.data,
        });
      }
      return response?.data?.data;
    })
    .catch(() => {
      return null;
    });
};
export default GetStateApi;
