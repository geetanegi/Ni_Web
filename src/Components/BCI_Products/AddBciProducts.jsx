import React, { useState, useEffect } from "react";
import PageLayout from "../Layout/pageLayout";
import { Input, Select, Button, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import uploadPdfApi from "../../Api/uploadPdfApi";
import { Status } from "../../Utils/enum";
import TextArea from "antd/es/input/TextArea";
import DeleteBCIproduct from "../../Api/DeleteBCIproductApi";
import DeactivateBCIProduct from "../../Api/DeactivateBCIProduct";
import ActivateBCIProduct from "../../Api/ActivateBCIProduct";
import { Spin } from "antd";
const AddBciProducts = ({ route, navigation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({});
  const [state, setstate] = useState({});
  const data = location.state;
  const [fileData, setFileData] = useState({});
  const [formdata1, setformdata] = useState(location.state);
  const [loading, setloading] = useState(false);
  const [checkFileData, setCheckFileData] = useState({});
  const [isOpenClick, setisOpenClick] = useState(true);
  const [isbase64, setisbase64] = useState(false);

  const Dropdowns = [
    { label: "PDF", Name: "PDF" },
    { label: "Video", Name: "Video" },
  ];

  const handleFileUpload = (status) => {
    setloading(true);
    const data = {
      checkFileData: checkFileData,
      formData: values,
      fileData: fileData,
      Status: status,
      Id: formdata1?.id,
      Isbase64: isbase64,
      Thumbnail: formdata1?.ThumbnailUrl,
      Filename: formdata1?.FileName
    };
   uploadPdfApi(data, navigate);
   setloading(false);
  };

  const onChangeValues = (key, value) => {
    const f = { ...value }
    setValues((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    setstate((data) => {
      return {
        ...data,
        [key]: value,
      };
    });
    if (key === 'url') {
      setValues((prev) => {
        return {
          ...prev,
          ['url']: value,
        };
      });
    }

  };


  useEffect(() => {
    if (data == null) {
    } else {
      setloading(true);
      setstate(data)

      setValues((prev) => {
        return {
          ...prev,
          ['Title']: data.Title,
        };
      });
      setValues((prev) => {
        return {
          ...prev,
          ['isactive']: data.IsActive,
        };
      });
      setValues((prev) => {
        return {
          ...prev,
          ['id']: data.id,
        };
      });
      setValues((prev) => {
        return {
          ...prev,
          ['Description']: data.Description
          ,
        };
      });
      setValues((prev) => {
        return {
          ...prev,
          ['url']: data.Url,
        };
      });
      setValues((prev) => {
        return {
          ...prev,
          ['Status_Enum']: data.Status_Enum,
        };
      });
      if (data.ThumbnailUrl == undefined) {
        setValues((prev) => {
          return {
            ...prev,
            ['type']: "Video",
          };
        });
      } else {
        setValues((prev) => {
          return {
            ...prev,
            ['type']: "PDF",
          };
        });
        setValues((prev) => {
          return {
            ...prev,
            ['pdf']: data.FileName,
          };
        });
       

      }
      setloading(false);
    }

  }, [data])


  const onCancel = () => {
    navigate("/bci-products");
  };

  const onDeactivate = (values) => {
    setloading(true);
    DeactivateBCIProduct(values).then((data) => {
    });
    setloading(false);
    navigate("/bci-products");
  };

  const onActivate = (values) => {
    setloading(true);
    ActivateBCIProduct(values).then((data) => {

    });
    setloading(false);
    navigate("/bci-products");
  };

  const onDelete = (values) => {
    setloading(true);
    DeleteBCIproduct(values).then((data) => {
    });
    setloading(false);
    navigate("/bci-products");
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        console.log(baseURL.split(",")[1]);
        resolve(baseURL.split(",")[1]);
      };
    });
  };

  const handleFileInputChange = (key, e) => {
    if (key === "pdf") {
      setFileData(e);
    }
    const file = e;
    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        setCheckFileData((prev) => {
          return {
            ...prev,
            [key]: result,
          };
        });
        setisOpenClick(false)
        if (isOpenClick !== 'true') {
          setisbase64(true)
        } else {
          setisbase64(false)
        }
      })
      .catch((err) => {
        setisbase64(false)
        console.log(err);
      });
  };
  return (
    <PageLayout>
      <Spin spinning={loading}>
        <div className="block px-6 rounded-lg shadow-lg bg-white max-w-24 ">
          <div className="bci-form">
            <div className="label-div-main">
              <label>Title :</label>
              <Input
                autocomplete="off"
                className="inputWidth"
                value={values?.Title}
                onChange={(e) => onChangeValues("Title", e?.target?.value)}
              />
            </div>
            <div className="label-div">
              <label>Description :</label>
              <TextArea
                style={{ verticalAlign: "middle" }}
                rows="3"
                autocomplete="off"
                value={values?.Description}
                className="input-Width-dec"
                onChange={(e) => onChangeValues("Description", e?.target?.value)}
              />
            </div>
            {data?.Url == undefined && (
              <div className="label-div">
                <label className="input-label">Type :</label>
                <Select
                  style={{ width: "30rem" }}
                  options={Dropdowns}
                  onChange={(e) => onChangeValues("type", e)}
                  allowClear={true}
                  fieldNames={{ label: "label", value: "Name" }}
                  placeholder={"Select"}
                />
              </div>
            )}
            {values?.type && <hr />}
            {values?.type === "PDF" && (
              <div>
                <div className="label-div">
                  <label>Select file :</label>
                  <input

                    className="input-Width-file"
                    // value={state?.Url}
                    onChange={(e) =>
                      handleFileInputChange("pdf", e?.target?.files?.[0])
                    }
                    type="file"
                    accept=".pdf"
                  />
                </div>
                {isOpenClick == false && (
                  <div className="label-div">
                    <label>File Name :</label>
                    <Input
                      disabled
                      autocomplete="off"
                      className="file-upload"
                      // value={state?.Url}
                      value={fileData?.name}
                    />
                  </div>
                )}
                {isOpenClick == true && (
                  <div className="label-div">
                    <label>File Name :</label>
                    <Input
                      disabled
                      autocomplete="off"
                      className="file-upload"
                      // value={state?.Url}
                      value={values?.pdf}
                    />
                  </div>
                )}
              </div>
            )}
            {values?.type === "Video" && (
              <div>
                <div className="label-div">
                  <label>URL :</label>
                  <Input
                    autocomplete="off"
                    value={values?.url}
                    className="input-url"
                    onChange={(e) => onChangeValues("url", e?.target?.value)}
                  />
                </div>
              </div>
            )}
            {data !== null && (
              <div className="label-div-main">
                <label>Status :</label>
                <Tag

                  style={{ fontWeight: "724", color: "green", width: "auto", height: "auto" }}
                  className="inputWidthSatatus"
                  disabled
                >
                  {values?.Status_Enum}
                </Tag>
              </div>
            )}
            <hr />
            <div style={{ display: "flex", margin: "23px", justifyContent: "flex-end" }}>
              <div className="box-button">
                {(values?.Status_Enum == "PUBLISH" && values?.isactive == true) && (

                  <div className="deactivate">
                    <Button
                      className="Deactivate-btn"
                      onClick={() => onDeactivate(values.id)}
                    >
                      Deactivate
                    </Button>

                  </div>
                )}
                {(values?.Status_Enum == "PUBLISH" && values?.isactive == false) && (
               
                    <div className="deaft">
                      <Button
                        className="active-btn"
                        onClick={() => onActivate(values.id)}
                      >
                        Activate
                      </Button>
                    </div>
                 
                )}
                {state?.Status_Enum !== "PUBLISH" && (
                  <div className="publish">
                    <Button
                      className="active-btn"
                      onClick={() => handleFileUpload(Status?.DRAFT)}
                    >
                      Save As Draft
                    </Button>
                  </div>
                )}
                <div className="publish">
                  <Button
                    className="active-btn"
                    onClick={() => handleFileUpload(Status?.PUBLISH)}
                  >
                    Publish
                  </Button>
                </div>
                {values?.Status_Enum == "DRAFT" && (
                  <div className="delete">
                    <Button onClick={() => onDelete(values.id)} className="Deactivate-btn">
                      Delete
                    </Button>
                  </div>
                )}
                <div className="cancel">
                  <Button onClick={onCancel} className="Deactivate-btn">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    </PageLayout>
  );
};

export default AddBciProducts;
