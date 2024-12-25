import { SET_USER_PASSWORD, RESET_USER_PASSWORD } from "../Action/index";

const initialState = [];
const savePassword = (state = initialState, action = {}) => {
    if (action.type === SET_USER_PASSWORD) {
        const password = action.payload;

        return { ...state, ...password };
    }
    else if (action.type === RESET_USER_PASSWORD) {
        return initialState;
    }
    return state;
};
export default savePassword;
