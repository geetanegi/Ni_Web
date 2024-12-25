import React, { useState, useEffect } from "react";
import PageLayout from "../Layout/pageLayout";
import { DatePicker, Select, Form, Button } from "antd";
import download from "../../Assets/Images/download.png";
import GetStateApi from "../../Api/GetStateApi";
import checklistApi from "../../Api/getChecklistApi";
import { GetDistrictApi } from "../../Api/GetDistrictApi";
import { GetBlockApi } from "../../Api/GetBlockApi";
import GetRecordsApi from "../../Api/getRecordsApi";
import { saveChecklist } from "../../Api/saveChecklistApi";
const FormItem = Form.Item;
const CheckList = () => {
  const [checklist, setChecklist] = useState([]);
  const [states, setStates] = useState([]);
  const [district, setDistrict] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formData, setFormData] = useState([]);
  const [records, setRecords] = useState("");
  const [fileName, setFileName] = useState({});
  useEffect(() => {
    document.title = "Download Checklist";
    checklistApi().then((data) => {
      setChecklist(data);
    });
    GetStateApi().then((data) => {
      setStates(data);
    });
  }, []);
  const handleDropdownChange = (value, key) => {
    switch (key) {
      case "state":
        GetDistrictApi(value).then((data) => {
          setDistrict(data);
        });
        break;
      case "district":
        GetBlockApi(value).then((data) => {
          setBlocks(data);
        });
        break;
      default:
    }
  };
  const payloadData = {

    ChecklistId: formData?.checklist,
    BlockId: formData?.block ? formData?.block : null,
    StateId: formData?.state ? formData?.state : null,
    DistrictId: formData?.district ? formData?.district : null,
    StartDate: startDate,
    EndDate: endDate,
  };
  const handleSubmit = () => {
    saveChecklist(payloadData, fileName);
  };
  const handleRecords = () => {
    GetRecordsApi(payloadData).then((res) => {
      setRecords(res);
    });
  };
  const handleDateChange = (key, value) => {
    const date = value.format("YYYY-MM-DD");
    if (key === "startDate") {
      setStartDate(date);
    } else if (key === "endDate") {
      setEndDate(date);
    } else if (key === "cancel") {
      console.log('------------------keyyyyyyyyyyyyyyyyy', key)

    }
  };
  const setValues = (value, key) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const saveFilename = (value, key) => {
    if (key === "checklist") {
      const temp = checklist?.find((e) => e.id === value);
      setFileName((prev) => {
        return {
          ...prev,
          [key]: temp,
        };
      });
    } else if (key === "block") {
      const temp = blocks?.find((e) => e.id === value);
      setFileName((prev) => {
        return {
          ...prev,
          [key]: temp,
        };
      });
    }
  };
  const handleChange = (value, key) => {
    handleDropdownChange(value, key);
    setValues(value, key);
    saveFilename(value, key);
  };
  return (
    <PageLayout>
      <div className="main-checklist">
        <div style={{ width: "96vw" }}>
          <div className="checklist-name">
            <span>Checklist Details</span>
          </div>
          <hr className="hr-color" />
          <div className="checklist-form">
            <Form name="CheckList Details" layout="vertical">
              <div className="checklist-input">
                <div>
                  <label>Checklist :</label>
                  <FormItem
                    name="Checklist"
                    rules={[
                      {
                        required: true,
                        message: "Please select checklist.",
                      },
                    ]}
                  >
                    <Select
                      style={{ width: "21rem" }}
                      options={checklist}
                      onChange={(value) => handleChange(value, "checklist")}
                      allowClear={true}
                      fieldNames={{ label: "Checklist", value: "id" }}
                      placeholder={"Select Checklist"}
                    />
                  </FormItem>
                </div>
                <div className="label-div">
                  <label>State :</label>
                  <FormItem name="State">
                    <Select
                      defaultValue={"ALL"}
                      style={{ width: "21rem" }}
                      options={states}
                      onChange={(value) => handleChange(value, "state")}
                      allowClear={true}
                      fieldNames={{ label: "State", value: "id" }}
                      placeholder={"Select State"}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="checklist-input">
                <div>
                  <label>District : </label>
                  <FormItem name="District">
                    <Select
                      defaultValue={"ALL"}
                      style={{ width: "21rem" }}
                      options={district}
                      onChange={(value) => handleChange(value, "district")}
                      allowClear={true}
                      fieldNames={{ label: "District", value: "id" }}
                      placeholder={"Select District"}
                    />
                  </FormItem>
                </div>
                <div className="label-div">
                  <label>Block : </label>
                  <FormItem name="Block">
                    <Select
                      defaultValue={"ALL"}
                      style={{ width: "21rem" }}
                      options={blocks}
                      onChange={(value) => handleChange(value, "block")}
                      allowClear={true}
                      fieldNames={{ label: "Block", value: "id" }}
                      placeholder={"Select Block"}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="checklist-input">
                <div>
                  <label>Start Date :</label>
                  <FormItem
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: "Please select start date.",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "21rem" }}
                      placeholder="Start Date"
                      onChange={(e) => handleDateChange("startDate", e)}

                    />
                  </FormItem>
                </div>
                <div className="label-div">
                  <label>End Date :</label>
                  <FormItem
                    name="endDate"
                    rules={[
                      {
                        required: true,
                        message: "Please select end date.",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "21rem" }}
                      placeholder="Start Date"
                      onChange={(e) => handleDateChange("endDate", e)}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="checklist-input">
                <div>
                  <Button
                    style={{ backgroundColor: "green" }}
                    onClick={handleRecords}
                  >
                    Get Records
                  </Button>
                  {records ? (
                    <label style={{ marginLeft: "1rem" }}>
                      {records} {"Records available as per your criteria"}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <hr className="hr-color" />
              <div className="btn-div-downloard">
                <Button htmlType="submit" onClick={handleSubmit}>
                  Download Excel
                </Button>
              </div>
            </Form>
          </div>
        </div>
        {/* <div className="checklist-img">
          <div>
            <img
              className="download-img"
              src={download}
              alt=" application branding"
            />
          </div>
        </div> */}
      </div>
    </PageLayout>
  );
};

export default CheckList;
