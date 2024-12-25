import { Input, Row, Col, Button, Form } from "antd";
import React, { useState } from "react";
import { store } from "../../store";
import { useSelector } from "react-redux";
import { SET_USER_PASSWORD } from "../../Action";
import ChangePasswordApi from "../../Api/ChangePasswordApi";
import PageLayout from "../Layout/pageLayout";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { HasPermission, PERMISSION } from "../../Utils/enum";


const PasswordDetails = () => {
  const navigate = useNavigate();
  const userPassword = useSelector((state) => state.savePassword);
  const permissions = useSelector(
    (state) => state.myDetailsReducer?.Permissions
  );

  const [passwordConfig, setPasswordConfig] = useState({
    hidePass: true,
    hideConfirmPass: true,
  });

  const handlePassword = (targetValue, name) => {
    store.dispatch({
      type: SET_USER_PASSWORD,
      payload: { [name]: targetValue },
    });
  };
  const validatePassword = () => {
    if (userPassword.password !== userPassword?.confirmPassword) {
      return Promise.reject("Confirm Password do not matched");
    }
    return Promise.resolve();
  };
  const validateOldPassword = () => {
    if (userPassword.password === userPassword?.Oldpassword) {
      return Promise.reject("Password and old password do not matched");
    }
    return Promise.resolve();
  };
  const changePasword = () => {
    const data = {
      oldPassword: userPassword.Oldpassword,
      newPassword: userPassword?.confirmPassword,
    };
    ChangePasswordApi(data, navigate);
  };
  const handleCancel = () => {
    navigate("/users");
  };
  return (
    <PageLayout>
      <Form onFinish={changePasword}>
        <Row
          style={{
            border: "1.5px solid rgb(235,235,235)",
            padding: "1rem",
            width: "30rem",
          }}
          gutter={20}
        >
          <Col span={24}>
            <h5> Change Password</h5>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name="Oldpassword"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                   autocomplete ="off"
                    type="password"
                    style={{ width: "25rem", margin: "1rem 0px 0.5rem" }}
                    placeholder="Old Password"
                    onChange={(e) =>
                      handlePassword(e.target.value, "Oldpassword")
                    }
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      pattern: new RegExp(
                        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                      ),
                      message:
                        "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
                    },
                    {
                      required: true,
                    },
                    { validator: validateOldPassword },
                  ]}
                >
                  <Input
                   autocomplete ="off"
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
                    style={{ width: "25rem", margin: "1rem 0px 0.5rem" }}
                    placeholder="Password"
                    onChange={(e) => handlePassword(e.target.value, "password")}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  name="confirmPassword"
                  rules={[{ validator: validatePassword, required: true }]}
                >
                  <Input
                   autocomplete ="off"
                    type={passwordConfig.hideConfirmPass ? "password" : "text"}
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
                    onChange={(e) =>
                      handlePassword(e.target.value, "confirmPassword")
                    }
                    style={{ width: "25rem", margin: "1rem 0px 0.5rem" }}
                    placeholder=" Confirm Password "
                  />
                </Form.Item>
              </Col>
            </Row>
            {permissions == PERMISSION.CanAccessUserManagement && (
            <Row>
              <Button
                style={{
                  marginLeft: "5rem",
                }}
                onClick={handleCancel}
              >
                {" "}
                Cancel
              </Button>
              <Button
                htmlType="submit"
                style={{
                  marginLeft: "5rem",
                }}
              >
                {" "}
                Submit
              </Button>
            </Row>
            )}
             {permissions!== PERMISSION.CanAccessUserManagement && (
            <Button
                htmlType="submit"
                style={{
                  marginLeft: "7rem",
                  width:"10rem"
                }}
              >
                {" "}
                Submit
              </Button>
             )}
          </Col>
        </Row>
      </Form>
    </PageLayout>
  );
};

export default PasswordDetails;
