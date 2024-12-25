import MakeRequest from "../Utils/makeRequest";
import { GET_BENEFICIARY_DISTRICT, GET_DISTRICT, GET_FEEDBACK_DISTRICT } from "../Utils/Urls";
import { SET_USER_DISTRICT } from "../Action/index";
import { store } from "../store";


const GetDistrictApi =  (data) =>   new Promise((resolve,reject)=>{
    MakeRequest.getLoction(GET_DISTRICT, data).then((res)=>{
            if(res?.data?.data){
                resolve(res.data.data)
            }else{
                resolve([])
            }
    }).catch((err)=>{
        resolve([])
        reject(err)
    })
})

const GetFeedbackDistrictApi = async () => {
    return await MakeRequest.getfeedbackAuth(GET_FEEDBACK_DISTRICT)
        .then((response) => {
            if (response) {
                store?.dispatch({
                    type: SET_USER_DISTRICT,
                    payload: response?.data,
                });
            }
            return response?.data?.data
        })
        .catch(() => {
            return null;
        });
};

const GetBeneficiaryDistrictApi =  (data) =>   new Promise((resolve,reject)=>{
    MakeRequest.getBeneficiaryAuth(GET_BENEFICIARY_DISTRICT, data).then((res)=>{
            if(res?.data?.data){
                resolve(res.data.data)
            }else{
                resolve([])
            }
    }).catch((err)=>{
        resolve([])
        reject(err)
    })
})

export { GetDistrictApi, GetFeedbackDistrictApi,GetBeneficiaryDistrictApi };
