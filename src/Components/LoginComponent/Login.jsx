import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button, Checkbox, Form, Input } from "antd";
import loginApi from "../../Api/loginApi";
import ni_logo from "../../Assets/Images/ni_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../../store";
import { SET_LOGIN_DETAILS } from "../../Action";
const LoginPage = () => {
  const [hidePass, setHidepass] = useState(true);
  const [form] = Form.useForm();
  const loginData = useSelector((state) => state.loginReducer);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const permissions = useSelector(
    (state) => state.myDetailsReducer?.Permissions
  );
  const onChangeData = (targetValue, name) => {
    store?.dispatch({
      type: SET_LOGIN_DETAILS,
      payload: {
        [name]: targetValue,
      },
    });
  };

  useEffect(() => {
    if (
      localStorage.username &&
      localStorage.username !== "undefined" &&
      localStorage.password &&
      localStorage.password !== "undefined"
    ) {
      form.setFieldsValue({
        username: localStorage.username,
        password: localStorage.password,
      });
      setRemember(true);
    }
  }, []);

  const onFinish = () => {
    if (remember) {
      localStorage.setItem("username", loginData.userName);
      localStorage.setItem("password", loginData.password);
    }
    setLoading(true);
    loginApi({ loginData, remember, navigate, permissions }, () => {
      setLoading(false);
    });
  };
  const showPassword = () => {
    setHidepass(false);
  };
  const hidePassword = () => {
    setHidepass(true);
  };
  return (
    <>
      <div className="mainPage">
        <div className="centerOfPage">
          <img className="logoCss" src={ni_logo} alt=" application branding" />
          <p className="headingOfPage">Login</p>
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Input your Username.",
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="inputField"
                addonAfter={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={(e) => onChangeData(e.target.value, "userName")}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Input your Password.",
                },
              ]}
            >
              <Input
                autocomplete="off"
                className="inputField"
                type={hidePass ? "password" : "text"}
                placeholder="Password"
                onChange={(e) => onChangeData(e.target.value, "password")}
                addonAfter={
                  hidePass ? (
                    <IoMdEye onClick={() => showPassword()} />
                  ) : (
                    <IoMdEyeOff onClick={() => hidePassword()} />
                  )
                }
              />
            </Form.Item>
            <div className="forgetBtn">
              <Form.Item name="remember">
                <Checkbox
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                >
                  {" "}
                  Remember me
                </Checkbox>
              </Form.Item>
            </div>
            <Form.Item>
              <Button loading={loading} htmlType="submit" className="loginBtn">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="loginLink">
            <Link to="/feedback">{"Training feedback form link"}</Link>
          </div>
          <div className="loginLink">
            <Link to="/Registration">{"Beneficiary Registration"}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
