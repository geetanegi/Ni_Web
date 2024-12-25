import { SET_EDIT_USER_DETAILS, RESET_EDIT_USER_DETAILS } from "../Action/index";

const initialState ='';
const saveEditUser = (state = initialState, action = {}) => {
    if (action.type === SET_EDIT_USER_DETAILS) {
        const editDetils = action.payload;
        return { ...state, ...editDetils };
    }
    else if (action.type === RESET_EDIT_USER_DETAILS) {
        return initialState;
    }
    return state;
};
export default saveEditUser;
