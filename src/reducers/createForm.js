import { SET_CREATE_USER } from "../Action/index";

const initialState = {
};
const createForm = (state = initialState, action = {}) => {
    if (action.type === SET_CREATE_USER) {
        const createKey = action.payload;
        return { ...state, ...createKey };
    }
    return state;
};
export default createForm;
