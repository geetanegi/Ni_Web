import MakeRequest from "../Utils/makeRequest";
import { USERS } from "../Utils/Urls";
const UserDetailsGrid = async (data) => {
  return await MakeRequest.postAuth(USERS, data)
    .then((response) => {
      let data = {
        records: response?.data?.data,
        noOfRecords: response?.data?.recordsCount
      }
      return data
    })
    .catch(() => {
      return null;
    });
};
export default UserDetailsGrid;
