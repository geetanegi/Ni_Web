import MakeRequest from "../Utils/makeRequest";
import { DELETE_PRODUCT } from "../Utils/Urls";
import { notification } from "antd";
const DeleteBCIproductApi = async (data, navigate) => {
  return await MakeRequest.deleteAuth(`${DELETE_PRODUCT}${data}`)
    .then((response) => {
        if(response.status==200){
            notification.success({ message: 'BCI Product Deleted Successfully', duration: 5 })
            navigate("/bci-products");
        }else{
            notification.error({ message: 'Something went wrong please try again later', duration: 5 })
            navigate("/bci-products");
        }
      return response?.data
      
    })
    .catch(() => {
      return null;
    });
};
export default DeleteBCIproductApi;
