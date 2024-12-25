import { SET_USER_ROLES, RESET_USER_ROLES } from "../Action/index";

const initialState = [];
const saveRoles = (state = initialState, action = {}) => {
  if (action.type === SET_USER_ROLES) {
    const roles = action.payload;
  
    return roles
  }
  else if (action.type === RESET_USER_ROLES) {
    return initialState;
  }
  return state;
};
export default saveRoles;
