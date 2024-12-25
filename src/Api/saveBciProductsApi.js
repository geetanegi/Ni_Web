import MakeRequest from "../Utils/makeRequest";
import { SAVE_BCI_PRODUCTS } from "../Utils/Urls";
import { notification } from "antd";
const saveBciProductsApi = (data, navigate) => {
    MakeRequest.postAuth(SAVE_BCI_PRODUCTS, data)
        .then((response) => {
            if (response?.status === 200) {
                notification.success({ message: response?.data?.message, duration: 5 })
                navigate("/bci-products");
            }
        })
        .catch((err) => {

            // console.log('-------------errorrrrrrrr',err?.data)
            // for (let index = 0; index <  err?.data?.description.length; index++) { 
            //     console.log(err?.data?.description[index]); 
            // }

            notification.error({
                message: err?.data?.description + " " || "please enter correct Details",
                duration: 5,
            });
        });
};
export default saveBciProductsApi;
