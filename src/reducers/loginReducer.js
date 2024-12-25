import { SET_LOGIN_DETAILS } from "../Action/index";

const initialState = {};
const loginReducer = (state = initialState, action = {}) => {
  if (action.type === SET_LOGIN_DETAILS) {
    const loginDetils = action.payload;
    return { ...state, ...loginDetils };
  }
  return state;
};
export default loginReducer;
