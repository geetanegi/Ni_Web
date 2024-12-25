import MakeRequest from "../Utils/makeRequest";
import { ACTIVATE_BCI_PRODUCTS } from "../Utils/Urls";
import { notification } from "antd";
const ActivateBCIProduct = async (data, navigate) => {
  return await MakeRequest.postAuth(`${ACTIVATE_BCI_PRODUCTS}${data}`)
    .then((response) => {
            notification.success({ message: response?.data?.message, duration: 3 })
            navigate("/bci-products");
    
      return response?.data
      
    })
    .catch(() => {
      return null;
    });
};
export default ActivateBCIProduct;
