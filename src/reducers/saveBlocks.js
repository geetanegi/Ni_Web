import { SET_USER_BLOCK, RESET_USER_LOCATION } from "../Action/index";

const initialState = {
};
const saveLocation = (state = initialState, action = {}) => {
    if (action.type === SET_USER_BLOCK) {
        const block = action.payload;
        return { ...state, ...block };
    }
    else if (action.type === RESET_USER_LOCATION) {
        return initialState;
    }
    return state;
};
export default saveLocation;
