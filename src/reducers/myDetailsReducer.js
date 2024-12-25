import { RESET_USER_DETAILS, SET_LOGGED_USER } from "../Action/index";

const initialState = {};
const myDetailsReducer = (state = initialState, action = {}) => {
    if (action.type === SET_LOGGED_USER) {
        const loginUser = action.payload;
        return { ...state, ...loginUser };
    }
    else if (action.type === RESET_USER_DETAILS) {
        return initialState;
    }
    return state;
};
export default myDetailsReducer;
