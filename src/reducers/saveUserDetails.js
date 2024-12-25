import { SAVE_USER_FORM_DATA, RESET_USER_FORM_DATA } from "../Action/index";

const initialState = {};
const saveUserDetails = (state = initialState, action = {}) => {
    if (action.type === SAVE_USER_FORM_DATA) {
        const userData = action.payload;
        return { ...state, ...userData };
    }
    else if (action.type === RESET_USER_FORM_DATA) {
        return initialState;
    }
    return state;
};
export default saveUserDetails;
