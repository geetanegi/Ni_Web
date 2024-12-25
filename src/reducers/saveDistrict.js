import { SET_USER_DISTRICT, RESET_USER_LOCATION } from "../Action/index";

const initialState = {
};
const saveLocation = (state = initialState, action = {}) => {
    if (action.type === SET_USER_DISTRICT) {
        const district = action.payload;
        return { ...state, ...district };
    }
   
    else if (action.type === RESET_USER_LOCATION) {
        return initialState;
    }
    return state;
};
export default saveLocation;
