export const PERMISSION = {
  CanLoginToMobileApp: "CanLoginToMobileApp",
  CanLoginToWeb: "CanLoginToWeb",
  CanAccessUserManagement: "CanAccessUserManagement",
  CanViewUsers: "CanViewUsers",
  CanManageUsers: "CanManageUsers", //PM //hide Add User //hide User Name link //user-details route restriction
  CanCreateCenter: "CanCreateCenter",
  CanSubmitChecklist: "CanSubmitChecklist",
  CanViewAllFeedbacks: "CanViewAllFeedbacks", //PM //feedback list page route restriction
  CanViewAllSubmittedChecklist: "CanViewAllSubmittedChecklist", //export to excel page route restriction
  CanManageBciProduct: "CanManageBciProduct", //PM, PC //route restriction
  CanViewDashboard: "CanViewDashboard" //Admin, PM, PC, DC, SC //route restriction
};
export const HasPermission = (permissionArray, permissionToCheck) => {
  return permissionArray?.some((p) => p === permissionToCheck);
};
export const Status = {
  DRAFT: "DRAFT",
  PUBLISH: "PUBLISH"
}
