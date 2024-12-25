// import React, { useEffect, useState } from "react";
// import { Button, Col, Input, Row, Select, Form, Spin, Modal } from "antd";
// import side from "../../Assets/Images/side.png";
// import { useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { GetDistrictApi } from "../../Api/GetDistrictApi";
// import { GetBlockApi } from "../../Api/GetBlockApi";
// import saveEditUserApi from "../../Api/saveEditUser";
// import SaveUserDetails from "../../Api/SaveUserDetails";
// import PageLayout from "../Layout/pageLayout";
// import { editUserApi } from "../../Api/editUserApi";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import activateAndDeactivateUser from "../../Api/activateAndDeactivateUserApi";
// import ResetPasswordModal from "../UserManagementComponent/ResetPasswordModal";

// function UserDetailsForm() {
//   const navigate = useNavigate();
//   const [form] = Form.useForm();
//   const params = useParams();
//   const userLocation = useSelector((state) => state.saveLocation);
//   const rolesData = useSelector((state) => state.saveRoles);
//   const [isReset, setIsReset] = useState(false);
//   const [data, setData] = useState({
//     Name: "",
//     IsActive: false,
//     Role_Enum: "",
//     userDistrict: [],
//     userBlock: [],
//   });
//   const [loading, setloading] = useState(false);
//   const [passwordConfig, setPasswordConfig] = useState({
//     hidePass: true,
//     hideConfirmPass: true,
//   });
//   useEffect(() => {
//     console.log('---------------useEffect---------------')
//     if (params?.userid) {
//       setloading(true);
//       editUserApi(params?.userid)
//         .then((res) => {
//           if (res && res.data && Object.keys(res.data.data).length) {
//             const {
//               Name,
//               EmailId,
//               Location,
//               PhoneNumber,
//               RoleId,
//               RoleEnum,
//               UserId,
//               IsActive,
//             } = res.data.data;
//             console.log('--------------res....dataaa', res.data.data)
//             form.setFieldsValue({
//               IsActive,
//               Name,
//               PhoneNumber,
//               EmailId,
//               RoleId,
//               Role_Enum:RoleEnum,
//               StateId: Location?.StateData?.id,
//               DistrictId: Location?.DistrictData?.id,
//               BlockId: Location?.BlockData?.id,
//               UserId,
//             });
//             setData((prev) => ({
//               ...prev,
//               Role_Enum: RoleEnum,
//               IsActive,
//               Name,
//             }));
//             setloading(false);
//             fetchLocation("StateId", Location?.StateData?.id, true);
//             fetchLocation("DistrictId", Location?.DistrictData?.id, true);
//           }
//         })
//         .catch(() => {
//           setloading(false);
//         });
//     }
//   }, [params]);

//   const fetchLocation = (name, value, isOnComponentLoad) => {
//     let set_data = {};
//     if (name === "StateId" && value) {
//       setloading(true);
//       GetDistrictApi(value)
//         .then((data) => {
//           if (data?.length) {
//             setData((prev) => ({ ...prev, userDistrict: data, userBlock: [] }));
//             setloading(false);
//           }
//         })
//         .catch(() => setloading(false));
//       set_data = { DistrictId: null, BlockId: null };
//     }
//     if (name === "DistrictId" && value) {
//       setloading(true);
//       GetBlockApi(value)
//         .then((data) => {
//           if (data?.length) {
//             setData((prev) => ({ ...prev, userBlock: data }));
//             setloading(false);
//           }
//         })
//         .catch(() => setloading(false));
//       set_data = { BlockId: null };
//     }

//     !isOnComponentLoad && form.setFieldsValue(set_data);
//   };

//   const onChangesConditionalFields = (name, value) => {
//     let fetchFieldValue = form.getFieldValue(name),
//       set_data = {};
//     if (name === "RoleId") {
//       set_data = { StateId: null, DistrictId: null, BlockId: null };

//       let { Role_Enum } = rolesData.find((e) => e.id === value) || {};
//       setData((prev) => ({
//         ...prev,
//         Role_Enum,
//         userBlock: [],
//         userDistrict: [],
//       }));
//       form.setFieldsValue(set_data);
//     }
//     fetchLocation(name, fetchFieldValue);
//   };

//   const saveForm = (e) => {
//     console.log('--------------userrrrr',e)
//     const userReg = {
//       Name: e.Name,
//       PhoneNumber: e.PhoneNumber,
//       EmailId: e.EmailId,
//       RoleId: e.RoleId,
//       StateId: e.StateId,
//       DistrictId: e.DistrictId,
//       BlockId: e.BlockId,
//     };
//     const passwordData = {
//       oldPassword: e.Password,
//       newPassword: e.ConfirmPassword,
//     };
//     if (params.userid)
//       saveEditUserApi(userReg, form.getFieldValue("UserId"), navigate);
//     else if (!params.userid) {
//       SaveUserDetails(userReg, passwordData, navigate);
//     }
//   };
//   const handleCancel = () => {
//     form.resetFields();
//     navigate("/users");
//   };

//   const activeUserButton = (isActive) => {
//     const buttonStyle = {
//       marginRight: "15px",
//       color: "white",
//       background: isActive ? "red" : "green",
//     };

//     const handleConfirm = () => {
//       Modal.confirm({
//         title: `Are you sure you want to ${isActive ? `deactivate` : "activate"
//           } ${data?.Name}'s account?`,
//         okText: "OK",
//         cancelText: "Cancel",
//         onOk() {
//           activateAndDeactivateUser(isActive, params?.userid, navigate);
//         },
//       });
//     };

//     return (
//       <Button style={buttonStyle} onClick={handleConfirm}>
//         {isActive ? "Deactivate" : "Activate"}
//       </Button>
//     );
//   };

//   const validatePhoneNumber = (_, value) => {
//     const phoneNumberRegex = /^\d{10}$/;

//     if (!value) {
//       return Promise.reject();
//     } else if (!phoneNumberRegex.test(value)) {
//       return Promise.reject("Please enter a 10-digit number");
//     }
//     return Promise.resolve();
//   };
//   const resetPassword = () => {
//     setIsReset(true);
//   };
//   const cancelModal = () => {
//     setIsReset(false);
//   };

//   return (
//     <PageLayout>
//       <Spin spinning={loading}>
//         <Form
//           name="User registration"
//           onFinish={saveForm}
//           form={form}
//           layout="vertical"
//         >
//           <h4 className="userDetailsCss" style={{ padding: "10px" }}>
//             {params.userid ? "Edit User" : "User Registration"}
//           </h4>
//           <Row className="userDetailsCss">
//             <Col
//               span={24}
//               md={12}
//               style={{
//                 border: "2px solid rgb(235,235,235)",
//                 height: params?.userid ? "75vh" : "63vh",
//               }}
//             >
//               <h6 className="userDetailsCss" style={{ paddingTop: "10px" }}>
//                 User Details
//               </h6>
//               <hr />
//               <Row className="userDetailsCss" gutter={20}>
//                 <Col span={24} md={12}>
//                   <Form.Item
//                     name="Name"
//                     label="User Name"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Enter User name.",
//                       },
//                     ]}
//                   >
//                     <Input className="inputWd" autocomplete="off" />
//                   </Form.Item>
//                 </Col>
//                 <Col span={24} md={12}>
//                   <Form.Item
//                     name="EmailId"
//                     label="Email Address"
//                     rules={[
//                       {
//                         type: "email",
//                         message: "Enter  valid email address.",
//                         max: 255,
//                       },
//                     ]}
//                   >
//                     <Input className="inputWd" autocomplete="off" />
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <Row className="userDetailsCss" gutter={20}>
//                 <Col span={24} md={12}>
//                   <Form.Item
//                     name="PhoneNumber"
//                     label="Phone Number"
//                     rules={[
//                       { required: true },
//                       { validator: validatePhoneNumber },
//                     ]}
//                   >
//                     <Input
//                       className="imputWd"
//                       autocomplete="off"
//                       type="number"
//                     />
//                   </Form.Item>
//                 </Col>
//                 <Col span={24} md={12}>
//                   <Form.Item
//                     name="RoleId"
//                     label="Primary Role"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Select Role.",
//                       },
//                     ]}
//                   >
//                     <Select
//                       style={{ width: "17rem" }}
//                       options={rolesData}
//                       fieldNames={{ label: "Role", value: "id" }}
//                       onChange={(e) => onChangesConditionalFields("RoleId", e)}
//                       placeholder="Select Role"
//                       allowClear={true}
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>
//               <hr />
//               {[
//                 "Project_Coordinator",
//                 "District_Coordinator",
//                 "Sector_Coordinator",
//                 "FLW"
//               ].includes(data.Role_Enum) ? (
//                 <Row>
//                   <Col span={24} md={24}>
//                     <h6 className="userDetailsCss">Location</h6>
//                   </Col>
//                   <br />
//                   <Row
//                     className="userDetailsCss"
//                     gutter={20}
//                     style={{ width: "100%" }}
//                   >
//                     {[
//                       "Project_Coordinator",
//                       "District_Coordinator",
//                       "Sector_Coordinator",
//                       "FLW"
//                     ].includes(data.Role_Enum) ? (
//                       <Col span={24} md={12}>
//                         <Form.Item
//                           name="StateId"
//                           label="State"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Select State.",
//                             },
//                           ]}
//                         >
//                           <Select
//                             style={{ width: "17rem" }}
//                             allowClear={true}
//                             options={userLocation?.data}
//                             fieldNames={{ label: "State", value: "id" }}
//                             autocomplete="off"
//                             onChange={(e) =>
//                               onChangesConditionalFields("StateId", e)
//                             }
//                             placeholder="Select State"
//                           />
//                         </Form.Item>
//                       </Col>
//                     ) : null}

//                     {["District_Coordinator", "Sector_Coordinator", "FLW"].includes(
//                       data.Role_Enum
//                     ) ? (
//                       <Col span={24} md={12}>
//                         <Form.Item
//                           name="DistrictId"
//                           label="District"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Select District.",
//                             },
//                           ]}
//                         >
//                           <Select
//                             style={{ width: "17rem" }}
//                             onChange={(e) =>
//                               onChangesConditionalFields("DistrictId", e)
//                             }
//                             options={data.userDistrict}
//                             autocomplete="off"
//                             fieldNames={{ label: "District", value: "id" }}
//                             placeholder="Select District"
//                             allowClear={true}
//                           />
//                         </Form.Item>
//                       </Col>
//                     ) : null}
//                   </Row>

//                   {["Sector_Coordinator", "FLW"].includes(data.Role_Enum) ? (
//                     <Row className="userDetailsCss" style={{ width: "100%" }}>
//                       <Col span={24} md={24}>
//                         <Form.Item
//                           name="BlockId"
//                           label="Block"
//                           rules={[
//                             {
//                               required: true,
//                               message: "Select Block.",
//                             },
//                           ]}
//                         >
//                           <Select
//                             style={{ width: "17rem" }}
//                             options={data.userBlock}
//                             autocomplete="off"
//                             fieldNames={{ label: "Block", value: "id" }}
//                             placeholder="Select Block"
//                             allowClear={true}
//                           />
//                         </Form.Item>
//                       </Col>
//                     </Row>
//                   ) : null}
//                 </Row>
//               ) : null}

//               {/* {/* {!editData ? <hr /> : ""} */}

//               {!params.userid ? (
//                 <Row>
//                   <Col span={24} md={24}>
//                     <h6 className="userDetailsCss">User Password</h6>
//                   </Col>
//                   <Row
//                     className="userDetailsCss"
//                     gutter={20}
//                     style={{ width: "100%" }}
//                   >
//                     <Col span={24} md={12}>
//                       <Form.Item
//                         name="Password"
//                         label="Password"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Enter Password.",
//                           },
//                           {
//                             pattern: new RegExp(
//                               "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
//                             ),
//                             message:
//                               "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
//                           },
//                         ]}
//                       >
//                         <Input
//                           className="inputWd"
//                           autocomplete="off"
//                           type={passwordConfig.hidePass ? "password" : "text"}
//                           addonAfter={
//                             !passwordConfig.hidePass ? (
//                               <IoMdEye
//                                 onClick={() =>
//                                   setPasswordConfig({
//                                     ...passwordConfig,
//                                     hidePass: true,
//                                   })
//                                 }
//                               />
//                             ) : (
//                               <IoMdEyeOff
//                                 onClick={() =>
//                                   setPasswordConfig({
//                                     ...passwordConfig,
//                                     hidePass: false,
//                                   })
//                                 }
//                               />
//                             )
//                           }
//                         />
//                       </Form.Item>
//                     </Col>
//                     <Col span={24} md={12}>
//                       <Form.Item
//                         name="ConfirmPassword"
//                         label="Confirm Password"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Please confirm your password!",
//                           },
//                           ({ getFieldValue }) => ({
//                             validator(_, value) {
//                               if (
//                                 !value ||
//                                 getFieldValue("Password") === value
//                               ) {
//                                 return Promise.resolve();
//                               }
//                               return Promise.reject(
//                                 new Error("Password do not match")
//                               );
//                             },
//                           }),
//                         ]}
//                       >
//                         <Input
//                           className="inputWd"
//                           autocomplete="off"
//                           type={
//                             passwordConfig.hideConfirmPass ? "password" : "text"
//                           }
//                           addonAfter={
//                             !passwordConfig.hideConfirmPass ? (
//                               <IoMdEye
//                                 onClick={() =>
//                                   setPasswordConfig({
//                                     ...passwordConfig,
//                                     hideConfirmPass: true,
//                                   })
//                                 }
//                               />
//                             ) : (
//                               <IoMdEyeOff
//                                 onClick={() =>
//                                   setPasswordConfig({
//                                     ...passwordConfig,
//                                     hideConfirmPass: false,
//                                   })
//                                 }
//                               />
//                             )
//                           }
//                         />
//                       </Form.Item>
//                     </Col>
//                   </Row>
//                 </Row>
//               ) : (
//                 ""
//               )}

//               <hr />
//               <Row style={{ display: "flex", justifyContent: "end" }}>
//                 {params.userid ? activeUserButton(data?.IsActive) : null}
//                 <Button
//                   style={{
//                     marginRight: "15px",
//                     color: "white",
//                   }}
//                   onClick={handleCancel}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   style={{
//                     marginRight: "15px",
//                     backgroundColor: "rgb(165,52,58)",
//                     color: "white",
//                     borderColor: "rgb(165,52,58)",
//                   }}
//                   htmlType="submit"
//                 >
//                   Submit
//                 </Button>
//                 {params.userid ? (
//                   <div>
//                     <Button className="btnAddUser" onClick={resetPassword}>
//                       Reset Password
//                     </Button>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </Row>
//             </Col>
//             <Col span={24} md={12}>
//               <img
//                 src={side}
//                 alt=" application branding"
//                 style={{
//                   width: "48.7vw",
//                   height: params?.userid ? "75vh" : "63vh",
//                 }}
//               />
//             </Col>
//           </Row>
//         </Form>
//       </Spin>
//       {isReset ? (
//         <ResetPasswordModal isReset={isReset} cancelModal={cancelModal} />
//       ) : (
//         ""
//       )}
//     </PageLayout>
//   );
// }

// export default UserDetailsForm;
