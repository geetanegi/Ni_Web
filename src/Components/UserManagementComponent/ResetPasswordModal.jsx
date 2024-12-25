import React, { useState } from "react";
import { Button, Input, Form, Modal } from "antd";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useParams } from "react-router-dom";
import resetPassword from "../../Api/resetPassword";
const ResetPasswordModal = ({ isReset, cancelModal }) => {
  const [formData, setFormData] = useState({});
  const [passwordConfig, setPasswordConfig] = useState({
    hidePass: true,
    hideConfirmPass: true,
  });
  const params = useParams();
  const saveForm = () => {
    const data = { id: params?.userid, password: formData?.password };
    resetPassword(data).then(() => {
      cancelModal();
    })
  };
  const footer = (
    <>
      <div>
        <Button
          style={{ marginRight: "2rem" }}
          key="submit"
          htmlType="submit"
          onClick={saveForm}
          disabled={formData?.password !== formData?.ConfirmPassword}
        >
          Reset Password
        </Button>
        <Button key="cancel" onClick={cancelModal}>
          Cancel
        </Button>
      </div>
    </>
  );
  const handleChange = (key, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <>
      <div>
        <Modal
          visible={isReset}
          centered
          closable={false}
          className="Reset-Password-Modal"
          width={500}
          footer={footer}
        >
          <Form name="ResetPassword" layout="vertical">
            <div>
              <h6 className="userDetailsCss">Reset Password</h6>
            </div>
            <div style={{ width: "100%" }}>
              <Form.Item
                name="Password"
                label="Password"
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
                  onChange={(e) => handleChange("password", e?.target?.value)}
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

              <Form.Item
                name="ConfirmPassword"
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("Password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Password do not match"));
                    },
                  }),
                ]}
              >
                <Input
                  autocomplete="off"
                  onChange={(e) =>
                    handleChange("ConfirmPassword", e?.target?.value)
                  }
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
                />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ResetPasswordModal;
