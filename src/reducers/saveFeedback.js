import { SAVE_USER_FEEDBACK, RESET_USER_FEEDBACK } from "../Action/index";

const initialState = {};
const saveUserFeedback = (state = initialState, action = {}) => {
    if (action.type === SAVE_USER_FEEDBACK) {
        const userData = action.payload;
        return { ...state, ...userData };
    }
    else if (action.type === RESET_USER_FEEDBACK) {
        return initialState;
    }
    return state;
};
export default saveUserFeedback;
