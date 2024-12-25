import MakeRequest from "../Utils/makeRequest";
import { EDIT_USER } from "../Utils/Urls";
import { SET_EDIT_USER_DETAILS } from "../Action/index";
import { store } from "../store";

const editUserApi = (data) =>  MakeRequest.getLoction(EDIT_USER, data);
export {editUserApi};
