import { RESET_USER_DETAILS, SET_USER_DETAILS } from "../Action/index";

const initialState = {};
const allUserData = (state = initialState, action = {}) => {
  if (action.type === SET_USER_DETAILS) {
    const userDetils = action.payload;
    return { ...state, ...userDetils };
  }
  else if (action.type === RESET_USER_DETAILS) {
    return initialState;
  }
  return state;
};
export default allUserData;
