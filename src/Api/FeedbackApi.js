import MakeRequest from "../Utils/makeRequest";
import { SAVE_FEEDBACK, GET_FEEDBACK_ROLE, GET_FEEDBACK_TYPE_OF_TRAINING } from "../Utils/Urls";
const SaveUserFeedback = (data) => {
    return MakeRequest.postfeedbackAuth(SAVE_FEEDBACK, data)
};
export default SaveUserFeedback;

export const getFeedbackRole = async () => {
    return await MakeRequest.getfeedbackAuth(GET_FEEDBACK_ROLE)
}
export const getTypeOfTrainings = async () => {
    return await MakeRequest.getfeedbackAuth(GET_FEEDBACK_TYPE_OF_TRAINING)
}
