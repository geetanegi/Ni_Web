import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row, Select, Form, Spin, Modal } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetBeneficiaryDistrictApi, GetDistrictApi } from "../../Api/GetDistrictApi";
import { GetBeneficiaryBlockApi } from "../../Api/GetBlockApi";
import saveEditUserApi from "../../Api/saveEditUser";
import SaveUserDetails from "../../Api/SaveUserDetails";
import { editUserApi } from "../../Api/editUserApi";
import * as moment from "moment";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import activateAndDeactivateUser from "../../Api/activateAndDeactivateUserApi";
import ResetPasswordModal from "./ResetPasswordModal";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { format } from "date-fns";
import SaveBeneficaryUserApi from "../../Api/SaveBeneficaryUserApi";
import GetStateApi from "../../Api/GetStateApi";

const AddUpdateUser = (datass) => {
  const Dropdowns = [
    { label: "Female", Name: "Female" },
    { label: "Male", Name: "Male" },
  ];
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const params = useParams();
  const minDate = moment({ year: 1990, month: 1, day: 1 });
  const dataroute = datass;
  const [startDate, setStartDate] = useState(new Date());
  const userLocation = useSelector((state) => state);
  const rolesData = useSelector((state) => state.saveRoles);
  let date = new Date();
  const [isReset, setIsReset] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [showTittle, setTittle] = useState(null);
  const [setGender, setISGender] = useState("");
  const [data, setData] = useState({
    Name: "",
    IsActive: false,
    Role_Enum: "",
    userState: [],
    userDistrict: [],
    userBlock: [],
  });
  const [loading, setloading] = useState(false);
  const [passwordConfig, setPasswordConfig] = useState({
    hidePass: true,
    hideConfirmPass: true,
  });


  const apiCall = () => {
    GetStateApi()
      .then((data) => {
        if (data?.length) {
          setData((prev) => ({ ...prev, userState: data, userBlock: [], userDistrict: [] }));
          setloading(false);
        }
      })
      .catch(() => setloading(false));
  };

  useEffect(() => {
    apiCall();
    if (dataroute.datass == "true") {
      setTittle("Beneficiary Registration")
      setIsSelect('false');
      form.setFieldsValue({
        RoleId: "BENEFICIARY",
        Role_Enum: "BENEFICIARY",

      });
      setData((prev) => ({
        ...prev,
        Role_Enum: "BENEFICIARY"
      }));
    }
    if (params?.userid) {
      setloading(true);
      editUserApi(params?.userid)
        .then((res) => {
          if (res && res.data && Object.keys(res.data.data).length) {
            const {
              Name,
              EmailId,
              Location,
              PhoneNumber,
              RoleId,
              RoleEnum,
              UserId,
              IsActive,
              BeneficiaryData
            } = res.data.data;
            if (BeneficiaryData?.ChildsDOB !== undefined) {
              var date = new Date(BeneficiaryData?.ChildsDOB);
              var formattedDate = format(date, "yyyy-MM-dd");
              setStartDate(formattedDate);
            }
            form.setFieldsValue({
              IsActive: IsActive,
              Name: Name,
              PhoneNumber: PhoneNumber,
              EmailId: EmailId,
              RoleId: RoleId,
              Role_Enum: RoleEnum,
              StateId: Location?.StateData?.id,
              DistrictId: Location?.DistrictData?.id,
              BlockId: Location?.BlockData?.id,
              UserId: UserId,
              VillageName: BeneficiaryData?.VillageName,
              HusbandName: BeneficiaryData?.HusbandName,
              ChildName: BeneficiaryData?.ChildName,
              startDate: formattedDate,
              ChildSex: BeneficiaryData?.ChildsGender

            });
            setISGender(BeneficiaryData?.ChildsGender)
            setData((prev) => ({
              ...prev,
              Role_Enum: RoleEnum,
              IsActive,
              Name,
            }));
            setloading(false);
            fetchLocation("StateId", Location?.StateData?.id, true);
            fetchLocation("DistrictId", Location?.DistrictData?.id, true);
            // fetchLocation("BlockId", Location?.BlockData?.id, true);
          }
        })
        .catch(() => {
          setloading(false);
        });
    }
  }, [params, isSelect]);

  const handleDateChange = (key, value) => {
    if (value !== null) {
      const date = value.format("YYYY-MM-DD");
      if (key === "startDate" && key !== null) {
        setStartDate(date);

      }
    }
  };

  const fetchLocation = (name, value, isOnComponentLoad) => {
    let set_data = {};
    if (name === "StateId" && value) {
      setloading(true);
      GetBeneficiaryDistrictApi(value)
        .then((data) => {
          if (data?.length) {
            setData((prev) => ({ ...prev, userDistrict: data, userBlock: [] }));
            setloading(false);
          }
        })
        .catch(() => setloading(false));
      set_data = { DistrictId: null, BlockId: null };
    }
    if (name === "DistrictId" && value) {
      setloading(true);
      GetBeneficiaryBlockApi(value)
        .then((data) => {
          if (data?.length) {
            setData((prev) => ({ ...prev, userBlock: data }));
            setloading(false);
          }
        })
        .catch(() => setloading(false));
      set_data = { BlockId: null };
    }
    !isOnComponentLoad && form.setFieldsValue(set_data);
  };

  const onChangesConditionalFields = (name, value) => {
    let fetchFieldValue = form.getFieldValue(name),
      set_data = {};
    if (name === "RoleId") {
      set_data = { StateId: null, DistrictId: null, BlockId: null };
      let { Role_Enum } = rolesData.find((e) => e.id === value) || {};
      setData((prev) => ({
        ...prev,
        Role_Enum,
        userBlock: [],
        userDistrict: [],
      }));
      form.setFieldsValue(set_data);
    }
    fetchLocation(name, fetchFieldValue);
  };

  const saveForm = (e) => {
    if (e.RoleId == undefined) {
      const userReg1 = {
        Name: e.Name,
        PhoneNumber: e.PhoneNumber,
        EmailId: e.EmailId,
        RoleId: 8,
        StateId: e.StateId,
        DistrictId: e.DistrictId,
        BlockId: e.BlockId,
        VillageName: e.VillageName,
        HusbandName: e.HusbandName,
        ChildsName: e.ChildName,
        ChildsDOB: startDate,
        ChildsGender: setGender
      };
      const passwordData = {
        oldPassword: e.Password,
        newPassword: e.ConfirmPassword,
      };
      if (params.userid)
        saveEditUserApi(userReg1, form.getFieldValue("UserId"), navigate);
      else if (!params.userid) {
        SaveBeneficaryUserApi(userReg1, dataroute.datass, passwordData, navigate);
      }

    } else {
      const userReg = {
        Name: e.Name,
        PhoneNumber: e.PhoneNumber,
        EmailId: e.EmailId,
        RoleId: e.RoleId,
        StateId: e.StateId,
        DistrictId: e.DistrictId,
        BlockId: e.BlockId,
        VillageName: e.VillageName,
        HusbandName: e.HusbandName,
        ChildsName: e.ChildName,
        ChildsDOB: startDate,
        ChildsGender: setGender
      };
      const passwordData = {
        oldPassword: e.Password,
        newPassword: e.ConfirmPassword,
      };
      if (params.userid)
        saveEditUserApi(userReg, form.getFieldValue("UserId"), navigate);
      else if (!params.userid) {
        SaveUserDetails(userReg, passwordData, navigate);
      }
    }
  };
  const handleCancel = () => {
    form.resetFields();
    if (dataroute.datass == undefined && params?.userid == undefined) {
      navigate("/login");
    } else {
      navigate("/users");
    }

  };

  const activeUserButton = (isActive) => {
    const buttonStyle = {
      marginRight: "15px",
      color: "white",
      background: isActive ? "red" : "green",
    };

    const handleConfirm = () => {
      Modal.confirm({
        title: `Are you sure you want to ${isActive ? `deactivate` : "activate"
          } ${data?.Name}'s account?`,
        okText: "OK",
        cancelText: "Cancel",
        onOk() {
          activateAndDeactivateUser(isActive, params?.userid, navigate);
        },
      });
    };

    return (
      <Button style={buttonStyle} onClick={handleConfirm}>
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    );
  };

  const validatePhoneNumber = (_, value) => {
    const phoneNumberRegex = /^\d{10}$/;

    if (!value) {
      return Promise.reject();
    } else if (!phoneNumberRegex.test(value)) {
      return Promise.reject("Please enter a 10-digit number");
    }
    return Promise.resolve();
  };
  const resetPassword = () => {
    setIsReset(true);
  };
  const cancelModal = () => {
    setIsReset(false);
  };

  const onChangeValues = (key, value) => {
    const f = { ...value }
    setISGender(value);
  };

  return (
    // <PageLayout>
    <Spin spinning={loading}>
      <Form
        name="User registration"
        onFinish={saveForm}
        form={form}
        layout="vertical"
      >
        {params?.userid && (
          <h4 className="userDetailsCss" style={{ padding: "10px" }}>
            Edit User
          </h4>)}
        {dataroute.datass == "true" && (
          <h4 className="userDetailsCss" style={{ padding: "10px" }}>
            Beneficiary Registration
          </h4>)}
        {(dataroute.datass == undefined && params?.userid == undefined) && (
          <h4 className="userDetailsCss" style={{ padding: "10px" }}>
            User Registration
          </h4>)}
        <Row className="">
          <Col
            span={24}
            style={{
              border: "2px solid rgb(235,235,235)",
              marginLeft: "4px"
            }}
          >
            <h6 className="userDetailsCss" style={{ paddingTop: "10px" }}>
              User Details
            </h6>
            <hr />
            <Row className="userDetailsCss" gutter={20}>
              <Col span={24} md={12}>

                {data.Role_Enum == "BENEFICIARY" && (
                  <Form.Item
                    name="Name"
                    label="माँ का नाम / માતાનું નામ :"
                    rules={[
                      {
                        required: true,
                        message: "Enter Mother name.",
                      },
                    ]}
                  >
                    <Input className="inputWd" autocomplete="off" />
                  </Form.Item>
                )}

                {data.Role_Enum !== "BENEFICIARY" && (
                  <Form.Item
                    name="Name"
                    label="User Name"
                    rules={[
                      {
                        required: true,
                        message: "Enter User name.",
                      },
                    ]}
                  >
                    <Input className="inputWd" autocomplete="off" />
                  </Form.Item>
                )}
              </Col>
              <Col span={24} md={12}>
                <Form.Item
                  name="EmailId"
                  label="ईमेल / ઈ - મેઈલ સરનામું"
                  rules={[
                    {
                      type: "email",
                      message: "Enter valid email address.",
                      max: 255,
                    },
                  ]}
                >
                  <Input className="inputWd" autocomplete="off" />
                </Form.Item>
              </Col>
            </Row>
            <Row className="userDetailsCss" gutter={20}>
              <Col span={24} md={12}>
                <Form.Item
                  name="PhoneNumber"
                  label="फ़ोन नंबर / ફોન નંબર"
                  rules={[
                    { required: true },
                    { validator: validatePhoneNumber },
                  ]}
                >
                  <Input
                    style={{ width: "17rem" }}
                    className="imputWd"
                    autocomplete="off"
                    type="number"
                  />
                </Form.Item>
              </Col>
              {dataroute.datass !== "true" && (
                <Col span={24} md={12}>
                  <Form.Item
                    name="RoleId"
                    label="Primary Role"
                    rules={[
                      {
                        required: true,
                        message: "Select Role.",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "17rem" }}
                      options={rolesData}
                      fieldNames={{ label: "Role", value: "id" }}
                      onChange={(e) => onChangesConditionalFields("RoleId", e)}
                      placeholder="Select Role"
                      allowClear={true}
                      disabled={isSelect}
                    />
                  </Form.Item>
                </Col>)}
            </Row>
            {[
              "Project_Coordinator",
              "District_Coordinator",
              "Sector_Coordinator",
              "FLW", "BENEFICIARY", "SUPERVISOR"
            ].includes(data.Role_Enum) ? (
              <hr />
            ) : null}

            {[
              "Project_Coordinator",
              "District_Coordinator",
              "Sector_Coordinator",
              "FLW", "BENEFICIARY", "SUPERVISOR"
            ].includes(data.Role_Enum) ? (
              <Row>
                <Col span={24} md={24}>
                  <h6 className="userDetailsCss">Location</h6>
                </Col>
                <br />
                <Row
                  className="userDetailsCss"
                  gutter={20}
                  style={{ width: "100%" }}
                >
                  {[
                    "Project_Coordinator",
                    "District_Coordinator",
                    "Sector_Coordinator",
                    "FLW", "BENEFICIARY", "SUPERVISOR"
                  ].includes(data.Role_Enum) ? (
                    <Col span={24} md={12}>
                      <Form.Item
                        name="StateId"
                        label="राज्य / રાજ્ય"
                        rules={[
                          {
                            required: true,
                            message: "Select State.",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "17rem" }}
                          allowClear={true}
                          options={data?.userState}
                          fieldNames={{ label: "State", value: "id" }}
                          autocomplete="off"
                          onChange={(e) =>
                            onChangesConditionalFields("StateId", e)
                          }
                          placeholder="Select State"
                        />
                      </Form.Item>
                    </Col>
                  ) : null}

                  {[
                    "District_Coordinator",
                    "Sector_Coordinator",
                    "FLW", "BENEFICIARY", "SUPERVISOR"
                  ].includes(data.Role_Enum) ? (
                    <Col span={24} md={12}>
                      <Form.Item
                        name="DistrictId"
                        label="जिला / જિલ્લો"
                        rules={[
                          {
                            required: true,
                            message: "Select District.",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "18rem" }}
                          onChange={(e) =>
                            onChangesConditionalFields("DistrictId", e)
                          }
                          options={data.userDistrict}
                          autocomplete="off"
                          fieldNames={{ label: "District", value: "id" }}
                          placeholder="Select District"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                  ) : null}
                </Row>

                {["Sector_Coordinator", "FLW", "BENEFICIARY", "SUPERVISOR"].includes(data.Role_Enum) ? (
                  <Row className="userDetailsCss" style={{ width: "100%" }}>
                    <Col span={24} md={24}>
                      <Form.Item
                        name="BlockId"
                        label="ब्लॉक का नाम / બ્લોકનું નામ"
                        rules={[
                          {
                            required: true,
                            message: "Select Block.",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "17rem" }}
                          options={data.userBlock}
                          autocomplete="off"
                          fieldNames={{ label: "Block", value: "id" }}
                          placeholder="Select Block"
                          allowClear={true}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ) : null}
              </Row>
            ) : null}

            {["BENEFICIARY"].includes(data.Role_Enum) ? (
              <hr />
            ) : null}

            {["BENEFICIARY"].includes(data.Role_Enum) ? (
              <Row className="userDetailsCss" gutter={20}>
                <Col span={24} md={12}>
                  <Form.Item
                    name="VillageName"
                    label="गाँव का नाम / ગામનું નામ"
                    rules={[
                      {
                        required: true,
                        message: "Enter Village name.",
                      },
                    ]}
                  >
                    <Input className="inputWd" autocomplete="off" />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item
                    name="HusbandName"
                    label="पति का नाम / પતિનું નામ"
                    rules={[
                      {
                        required: true,
                        message: "Enter Name of the husband."
                      },
                    ]}
                  >
                    <Input className="inputWd" autocomplete="off" />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item
                    name="ChildName"
                    label="बच्चे का नाम: (2 वर्ष तक) / બાળકનું નામ: (2 વર્ષ સુધી) "
                    rules={[
                      {
                        required: true,
                        message: "Enter Name of the child.",
                      },
                    ]}
                  >
                    <Input className="inputWd" autocomplete="off" />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <div>
                    <label> जन्म की तारीख / જન્મ ની તારીખ </label>
                    <Form.Item
                      //  name="startDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select DOB.",
                        },
                      ]}
                    >
                      {/* <DatePicker
                          value={"2020-09-01"}
                          format={"YYYYMMDD"}
                          style={{ width: "18rem" }}
                          selected={'2020-09-09'}
                          onChange={date => setStartDate(date)}
                        /> */}
                      {/* <DatePicker

                        style={{ width: "18rem" }}
                        // value={startDatee}
                        placeholder="Date of birth"
                        onChange={(e) => handleDateChange("startDate", e)}
                      /> */}
                      {/* <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} /> */}
                      <DatePicker style={{ width: "273px" }} defaultValue={dayjs(startDate)} onChange={(date) => handleDateChange("startDate", date)} allowClear />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={24} md={12}>

                  {/* <div className="label-div">
                <label className="input-label">Type :</label>
                <Select
                  style={{ width: "30rem" }}
                   options={Dropdowns}
                   onChange={(e) => onChangeValues("type", e)}
                  allowClear={true}
                  fieldNames={{ label: "label", value: "Name" }}
                  placeholder={"Select"}
                />
              </div> */}
                  <label className="input-label" style={{ margin: "5px" }}>बच्चे का लिंग / બાળકનું લિંગ</label>
                  <div className="label-div" style={{ marginLeft: "-41px" }}>

                    <Select
                      style={{ width: "17rem" }}
                      value={setGender}
                      options={Dropdowns}
                      onChange={(e) => onChangeValues("ChildSex", e)}
                      allowClear={true}
                      fieldNames={{ label: "label", value: "Name" }}
                      placeholder={"Select"}
                    />
                  </div>
                  {/* <Form.Item
                    name="ChildSex"
                    label="Sex of the child"
                    rules={[
                      {
                        required: true,
                        message: "Enter Sex of the child.",
                      },
                    ]}
                  >
                    <Input className="inputWd" autocomplete="off" />
                  </Form.Item> */}
                </Col>
              </Row>
            ) : null}

            {/* {/* {!editData ? <hr /> : ""} */}
            <hr />
            {!params.userid ? (
              <Row>
                <Col span={24} md={24}>
                  <h6 className="userDetailsCss">उपयोगकर्ता पासवर्ड / વપરાશકર્તા પાસવર્ડ</h6>
                </Col>
                <Row
                  className="userDetailsCss"
                  gutter={20}
                  style={{ width: "100%" }}
                >
                  <Col span={24} md={12}>
                    <Form.Item
                      name="Password"
                      label="पासवर्ड / પાસવર્ડ"
                      rules={[
                        {
                          required: true,
                          message: "Enter Password.",
                        },
                        {
                          pattern: new RegExp(
                            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                          ),
                          message:
                            "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
                        },
                      ]}
                    >
                      <Input
                        className="inputWd"
                        autocomplete="off"
                        type={passwordConfig.hidePass ? "password" : "text"}
                        addonAfter={
                          !passwordConfig.hidePass ? (
                            <IoMdEye
                              onClick={() =>
                                setPasswordConfig({
                                  ...passwordConfig,
                                  hidePass: true,
                                })
                              }
                            />
                          ) : (
                            <IoMdEyeOff
                              onClick={() =>
                                setPasswordConfig({
                                  ...passwordConfig,
                                  hidePass: false,
                                })
                              }
                            />
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={12}>
                    <Form.Item
                      name="ConfirmPassword"
                      label="पासवर्ड की पुष्टि कीजिये / પાસવર્ડની પુષ્ટિ કરો"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("Password") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Password do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        className="inputWd"
                        autocomplete="off"
                        type={
                          passwordConfig.hideConfirmPass ? "password" : "text"
                        }
                        addonAfter={
                          !passwordConfig.hideConfirmPass ? (
                            <IoMdEye
                              onClick={() =>
                                setPasswordConfig({
                                  ...passwordConfig,
                                  hideConfirmPass: true,
                                })
                              }
                            />
                          ) : (
                            <IoMdEyeOff
                              onClick={() =>
                                setPasswordConfig({
                                  ...passwordConfig,
                                  hideConfirmPass: false,
                                })
                              }
                            />
                          )
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
            ) : (
              ""
            )}


            {/* <hr /> */}
            <Row style={{ display: "flex", justifyContent: "end", margin: "10px" }}>
              {params.userid ? activeUserButton(data?.IsActive) : null}
              <Button
                style={{
                  marginRight: "15px",
                  color: "white",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  marginRight: "15px",
                  backgroundColor: "rgb(165,52,58)",
                  color: "white",
                  borderColor: "rgb(165,52,58)",
                }}
                htmlType="submit"
              >
                Submit
              </Button>
              {params.userid ? (
                <div>
                  <Button className="btnAddUser" onClick={resetPassword}>
                    Reset Password
                  </Button>
                </div>
              ) : (
                ""
              )}
            </Row>
          </Col>
          {/* <Col span={24} md={12}>
              <img
                src={side}
                alt=" application branding"
                style={{
                  width: "48.7vw",
                  height: params?.userid ? "75vh" : "63vh",
                }}
              />
            </Col> */}
        </Row>
      </Form>
      {isReset ? (
        <ResetPasswordModal isReset={isReset} cancelModal={cancelModal} />
      ) : (
        ""
      )}
    </Spin>

  );
}

export default AddUpdateUser;
