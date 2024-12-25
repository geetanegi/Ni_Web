import moment from "moment";
import { ExportExcel } from "../Hoc/ExportExcel";
import MakeRequest from "../Utils/makeRequest";
import { GET_LUMENORE_CHECKLIST, SAVE_CHECKLIST } from "../Utils/Urls";
import { notification } from "antd";

const saveChecklist = (data, Name) => {
    const currentDate = new Date();
    const date = moment(currentDate).format("DD-MM-YYYY HH:mm:ss")
    const fileName = `checklist_${Name?.checklist?.Checklist}_${Name?.block?.Block}_${date}`
    MakeRequest.postAuth(SAVE_CHECKLIST, data)
        .then((response) => {
            const excelData = response?.data?.data
            if (response?.status === 200) {
                ExportExcel(excelData, fileName)
                notification.success({
                    message: "Downloading...",
                    duration: 5,
                });
            }
        })
        .catch((err) => {

            notification.error({
                message: err?.data?.description,
                duration: 5,
            });
        });
};

const lumenoresSaveChecklist = (data, Name) => {
    const currentDate = new Date();
    const date = moment(currentDate).format("DD-MM-YYYY HH:mm:ss")
    const fileName = `checklist_${Name?.checklist?.Checklist}_${date}`
    MakeRequest.postLumenoreAuth(GET_LUMENORE_CHECKLIST, data)
        .then((response) => {
            const excelData = response?.data?.data
            if (response?.status === 200) {
                ExportExcel(excelData, fileName)
                notification.success({
                    message: "Downloading...",
                    duration: 5,
                });
            }
        })
        .catch((err) => {
            notification.error({
                message: err?.data?.description,
                duration: 5,
            });
        });
};
export { saveChecklist, lumenoresSaveChecklist };
