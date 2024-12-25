import MakeRequest from "../Utils/makeRequest";
import { DEACTIVATE_BCI_PRODUCTS } from "../Utils/Urls";
import { notification } from "antd";
const DeactivateBCIProduct = async (data, navigate) => {
  return await MakeRequest.postAuth(`${DEACTIVATE_BCI_PRODUCTS}${data}`)
    .then((response) => {
        notification.success({ message: response?.data?.message, duration: 3 })
            navigate("/bci-products");
      return response?.data
      
    })
    .catch(() => {
      return null;
    });
};
export default DeactivateBCIProduct;
