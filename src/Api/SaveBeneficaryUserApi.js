import MakeRequest from "../Utils/makeRequest";
import { SAVE_USER_BENEFICARY } from "../Utils/Urls";
import { notification } from "antd";
const SaveBeneficaryUserApi = (data,datsss, passwordData, navigate) => {
  MakeRequest.postBeneficiaryAuth(SAVE_USER_BENEFICARY, data)
    .then((response) => {
      if (response?.status === 200 && response?.data?.data) {
        MakeRequest.postBeneficiaryAuth(
          `/beneficiary/password/${response?.data?.data?.userId}`,
          {
            Password: passwordData.newPassword,
          }
        ).then(() => {
          notification.success({
            message: "Beneficiary User has been Created Successfully",
            duration: 5,
          });
          if(datsss==undefined){
            navigate("/users");
          }
         else{
            navigate("/login");
         }
        });
      }
    })
    .catch((err) => {
      notification.error({
        message: err?.data?.description || "please enter correct user Details",
        duration: 5,
      });
    });
};
export default SaveBeneficaryUserApi;
