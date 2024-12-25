import { combineReducers } from 'redux'
import loginReducer from "./loginReducer";
import allUserData from './allUsers'
import saveUserDetails from './saveUserDetails'
import saveLocation from './saveLocation'
import saveRoles from './saveRoles'
import savePassword from './savePassword'
import saveBlocks from './saveBlocks'
import saveDistrict from './saveDistrict'
import saveEditUser from './saveEditUser'
import myDetailsReducer from './myDetailsReducer'
import createUser from './createForm'


export default combineReducers({
    loginReducer,
    allUserData,
    saveUserDetails,
    saveLocation,
    saveRoles,
    savePassword,
    saveBlocks,
    saveDistrict,
    saveEditUser,
    myDetailsReducer,
    createUser
})