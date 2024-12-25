import MakeRequest from "../Utils/makeRequest";
import {
  GET_BENEFICIARY_BLOCKS,
  GET_BLOCKS,
  GET_FEEDBACK_BLOCKS,
} from "../Utils/Urls";
import { SET_USER_BLOCK } from "../Action/index";
import { store } from "../store";

const GetBlockApi = (data) =>
  new Promise((resolve, reject) => {
    MakeRequest.getLoction(GET_BLOCKS, data)
      .then((res) => {
        if (res?.data?.data) {
          resolve(res.data.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        resolve([]);
        reject(err);
      });
  });

const GetFeedbackBlockApi = async (data) => {
  console.log("GetFeedbackBlockApi", data);
  return await MakeRequest.getfeedbackAuth(`${GET_FEEDBACK_BLOCKS}${data}`)
    .then((response) => {
      if (response) {
        store?.dispatch({
          type: SET_USER_BLOCK,
          payload: response?.data,
        });
      }
      return response?.data?.data;
    })
    .catch(() => {
      return null;
    });
};

const GetBeneficiaryBlockApi = (data) =>
  new Promise((resolve, reject) => {
    MakeRequest.getBeneficiaryAuth(GET_BENEFICIARY_BLOCKS, data)
      .then((res) => {
        if (res?.data?.data) {
          resolve(res.data.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        resolve([]);
        reject(err);
      });
  });

export { GetBlockApi, GetFeedbackBlockApi, GetBeneficiaryBlockApi };
