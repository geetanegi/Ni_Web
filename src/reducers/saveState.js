import { SET_USER_STATE, RESET_USER_LOCATION } from "../Action/index";

const initialState = {
};
const saveLocation = (state = initialState, action = {}) => {
    if (action.type === SET_USER_STATE) {
        const states = action.payload;
        return { ...state, ...states};
    }
   
    else if (action.type === RESET_USER_LOCATION) {
        return initialState;
    }
    return state;
};
export default saveLocation;
