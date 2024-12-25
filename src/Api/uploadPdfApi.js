import MakeRequest from "../Utils/makeRequest";
import { UPLOAD_FILE } from "../Utils/Urls";
import { notification } from "antd";
import saveBciProductsApi from "./saveBciProductsApi";
const uploadPdfApi = (data, navigate) => {
    const payload = {
        Attachment: data?.checkFileData?.pdf,
        FileName: data?.fileData?.name
    }
    if(data?.formData?.type === "Video"){
        const payloadData = {
            Id:data?.Id,
            Title: data?.formData?.Title,
            Description: data?.formData?.Description,
            ContentType: data?.formData?.type,
            Url: data?.formData?.url,
            FileName: data?.fileData?.name,
            Status: data?.Status
        }
        saveBciProductsApi(payloadData, navigate)

    }else{
        if(data.Isbase64!==true){
            const payloadData = {
                Id:data?.Id,
                Title: data?.formData?.Title,
                Description: data?.formData?.Description,
                ContentType: data?.formData?.type,
                Url: data?.formData?.url,
                FileName: data?.Filename,
                ThumbnailUrl: data?.Thumbnail,
                FileName: data?.Filename,
                Status: data?.Status
            }
            saveBciProductsApi(payloadData, navigate)

        }else{
            MakeRequest.postAuth(UPLOAD_FILE, payload)
            .then((response) => {
                if (response) {
                    const payloadData = {
                        Id:data?.Id,
                        Title: data?.formData?.Title,
                        Description: data?.formData?.Description,
                        ContentType: data?.formData?.type,
                        Url: response?.data?.data?.url,
                        ThumbnailUrl: response?.data?.data?.thumbnailUrl,
                        FileName: response?.data?.data?.fileName,
                        Status: data?.Status
                    }
                    saveBciProductsApi(payloadData, navigate)
                }
            })
            .catch((err) => {
                notification.error({
                    message: err?.data?.description,
                    duration: 5,
                });
            });
        }
     
    }
 
};
export default uploadPdfApi;
