import { useEffect, useState } from "react";

import ni_logo from "../../Assets/Images/NI_1.png";
import SaveUserFeedback, {
  getFeedbackRole,
  getTypeOfTrainings,
} from "../../Api/FeedbackApi";
import { GetFeedbackBlockApi } from "../../Api/GetBlockApi";
import { GetFeedbackDistrictApi } from "../../Api/GetDistrictApi";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Space,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { feedbackQuestions } from "./FeedbackQuestions";
import PageLayout from "../Layout/pageLayout";
import PageTitle from "../Layout/pageTitle";

function FeedbackForm() {
  const [feedbackData, setFeedbackData] = useState({});
  const [typeofTraining, setTypeofTraining] = useState({});
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [rolesData, setRolesData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const onFinish = (e) => {
    SaveUserFeedback({
      ...feedbackData,
      Role: feedbackData?.Role || feedbackData?.RoleInput,
    }).then((response) => {
      if (response?.status == 200) {
        message.success("Form has been Submitted Succesfully");
        navigate("/feedback-success");
      } else {
        message.error(
          "Something went wrong. Please try again or contact to administrator."
        );
      }
    });
  };

  const onFinishFailed = () => {
    message.error("There is some error in form.");
  };

  useEffect(() => {
    document.title = "Feedback";
  }, []);
  useEffect(() => {
    feedbackRole();
    GetFeedbackDistrictApi().then((data) => {
      setDistricts(data);
    });
    getTypeOfTrainings().then((resp) => {
      if (resp && resp?.status === 200) {
        setTypeofTraining(resp?.data?.data?.TypeofTrainings);
      }
    });
  }, []);

  const feedbackRole = () => {
    getFeedbackRole().then((resp) => {
      if (resp && resp?.status === 200) {
        setRolesData(resp?.data?.data?.role);
      }
    });
  };

  const onChangeData = (targetValue, name, role = null) => {
    console.log(feedbackData);
    if (name === "DistrictId") {
      setFeedbackData({ ...feedbackData, [name]: targetValue, BlockId: null });
      GetFeedbackBlockApi(targetValue).then((data) => {
        form.setFieldValue("Block", null);
        setBlocks(data);
      });
    } else if (name === "RoleId") {
      form.setFieldValue("RoleInput", null);
      setFeedbackData({
        ...feedbackData,
        [name]: targetValue,
        Role: role,
        RoleInput: null,
      });
      setSelectedRole(role);
    } else if (name === "block") {
      setSelectedBlock({ [name]: targetValue });
    } else {
      setFeedbackData({ ...feedbackData, [name]: targetValue });
    }
  };

  const renderQuestions = () => {
    if (selectedRole === null) return null;
    const roleObject = feedbackQuestions.find(
      (question) => Object.keys(question)[0] === selectedRole
    );
    const roleQuestions = roleObject ? roleObject[selectedRole] : [];
    return (
      <>
        {roleQuestions.map((row, index) => (
          <Row key={index}>
            <Col>
              <Form.Item
                name={row.ques}
                label={row.ques}
                rules={[{ required: true }, { type: "string", max: 255 }]}
              >
                <Input
                  autocomplete="off"
                  className="imputWd"
                  value={feedbackData[row?.name]}
                  onChange={(e) => onChangeData(e.target.value, row?.name)}
                />
              </Form.Item>
            </Col>
          </Row>
        ))}
      </>
    );
  };

  const validateDecimal = (_, value) => {
    // Regular expression for a decimal number
    const decimalRegex = /^[+]?\d+(\.\d{1,2})?$/;
    if (value && !decimalRegex.test(value)) {
      return Promise.reject("Please enter a valid score number e.g.:50.12");
    }
    return Promise.resolve();
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

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white shadow ">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img
              className="NavLogo"
              src={ni_logo}
              alt=" application branding"
            />
          </a>
        </div>
      </nav>

      <div className="feedback-form">
        <h5 style={{ color: "black" }}>Training Assessment form</h5>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col>
              <Form.Item
                name="Participants Name"
                label="Participants Name"
                rules={[{ required: true }, { type: "string", max: 50 }]}
              >
                <Input
                  autocomplete="off"
                  className="imputWd"
                  value={feedbackData?.Name}
                  type="text"
                  onChange={(e) => onChangeData(e.target.value, "Name")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Email Address"
                label="Email Address"
                rules={[{ type: "email", max: 255 }]}
              >
                <Input
                  autocomplete="off"
                  className="imputWd"
                  value={feedbackData?.EmailId}
                  type="email"
                  onChange={(e) => onChangeData(e.target.value, "EmailId")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Phone Number"
                label="Phone Number"
                rules={[{ required: true }, { validator: validatePhoneNumber }]}
              >
                <Input
                  autocomplete="off"
                  type="number"
                  maxLength={10}
                  className="inputWd"
                  value={feedbackData?.PhoneNumber}
                  onChange={(e) => {
                    onChangeData(e.target.value.slice(0, 10), "PhoneNumber");
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Trainer Name"
                label="Trainer Name"
                rules={[{ required: true }, { type: "string", max: 255 }]}
              >
                <Input
                  autocomplete="off"
                  className="imputWd"
                  value={feedbackData?.TrainerName}
                  onChange={(e) => onChangeData(e.target.value, "TrainerName")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Type of Training"
                label="Type of Training"
                rules={[{ required: true }]}
              >
                <Select
                  value={feedbackData["TypeOfTrainingId"]}
                  options={typeofTraining}
                  style={{ flex: 1 }}
                  onChange={(e) => onChangeData(e, "TypeOfTrainingId")}
                  allowClear={true}
                  fieldNames={{ label: "Name", value: "id" }}
                  placeholder={"Select Type of Training"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Score Pre Test"
                label="Score Pre Test"
                rules={[
                  { required: true, max: 5 },
                  { validator: validateDecimal },
                ]}
              >
                <Input
                  autocomplete="off"
                  className="imputWd"
                  type="number"
                  maxLength={5}
                  value={feedbackData?.ScorePreTest}
                  onChange={(e) => onChangeData(e.target.value, "ScorePreTest")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Score Post Test"
                label="Score Post Test"
                rules={[
                  { required: true, max: 5 },
                  { validator: validateDecimal },
                ]}
              >
                <Input
                  autocomplete="off"
                  className="imputWd"
                  type="number"
                  maxLength={5}
                  pattern="[0-9]*"
                  value={feedbackData?.ScorePostTest}
                  onChange={(e) =>
                    onChangeData(e.target.value, "ScorePostTest")
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="District"
                label="District"
                rules={[{ required: true }]}
              >
                <Select
                  value={feedbackData["DistrictId"]}
                  options={districts}
                  style={{ flex: 1 }}
                  onChange={(e) => onChangeData(e, "DistrictId")}
                  allowClear={true}
                  fieldNames={{ label: "District", value: "id" }}
                  placeholder={"Select District"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                name="Block"
                label="Block"
                rules={[{ required: true }]}
              >
                <Select
                  options={blocks}
                  style={{ flex: 1 }}
                  onChange={(e) => onChangeData(e, "BlockId")}
                  allowClear={true}
                  fieldNames={{ label: "Block", value: "id" }}
                  placeholder={"Select Block"}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item
              name="Role"
              label="Role"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Radio.Group
                onChange={(e) => {
                  const selectedRole = rolesData?.find(
                    (role) => role?.id === e.target.value
                  )?.Role;
                  form.setFieldsValue({ RoleInput: "" });
                  form.validateFields(["Role Data"]);
                  onChangeData(e.target.value, "RoleId", selectedRole);
                }}
              >
                <Space direction="vertical">
                  {rolesData?.map((role) => (
                    <Radio key={role?.id} value={role?.id} name={role.Role}>
                      {role.Role}
                    </Radio>
                  ))}
                  <div className="d-flex">
                    <Radio key="other" value={0}></Radio>
                    <Form.Item
                      name="Role Data"
                      rules={[
                        {
                          required:
                            feedbackData?.RoleId == 0 &&
                            !feedbackData?.RoleInput,
                        },
                        { type: "string", max: 255 },
                      ]}
                    >
                      {console.log(feedbackData?.RoleId)}
                      <Input
                        autocomplete="off"
                        placeholder="Other"
                        className="inputWd"
                        style={{ height: "30px" }}
                        size="small"
                        disabled={feedbackData?.RoleId != 0}
                        onChange={(e) =>
                          onChangeData(e.target.value, "RoleInput")
                        }
                      />
                    </Form.Item>
                  </div>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Row>
          {renderQuestions()}
          <Row
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit Form
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default FeedbackForm;
