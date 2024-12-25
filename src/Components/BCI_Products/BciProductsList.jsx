import React, { useState, ClipboardEvent, useEffect } from "react";
import PageLayout from "../Layout/pageLayout";
import { Select, Button, Card, Empty, Pagination } from "antd";
import Search from "antd/es/input/Search";
import { useNavigate, Link } from "react-router-dom";
import VideoThumbnail from 'react-video-thumbnail';
import { GetPdfApi, GetVideosApi } from "../../Api/getBciProductsApi";
import { Spin } from "antd";
import GetBciProduct from "../../Api/getAllBciProductApi";
import PageTitle from "../Layout/pageTitle";
import { log } from "util";
import YoutubeThumbnail from "youtube-thumbnail";
const defaultDataOption = {
  Filters: {}
};

const BciProductsList = ({ navigation }) => {
  var youtubeThumbnail = require('youtube-thumbnail');
 

  const [serarchField, setSerarchField] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [loading, setloading] = useState(false);
  const [dataOptions, setDataOptions] = useState(defaultDataOption);
  const [bciData, setBciData] = useState([]);
  const [totalPage, setTotalPage] = useState(500);
  const Dropdowns = [
    { label: "PDF", Name: "PDF" },
    { label: "Video", Name: "Video" },
  ];
  const StatusDropdowns = [
    { label: "Active", Name: "Active" },
    { label: "Deactive", Name: "Deactive" },
  ];
  const navigate = useNavigate();
  const onChangeValues = (e) => {
    if (e === "PDF") {
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["Type"] = 'PDF';
      iDataOptons.Filters["IsActive"] = statusValue;
      iDataOptons.Filters["SearchText"] = serarchField;
      GetBciProduct(iDataOptons).then((data) => {
        setBciData(data?.data);
        setTypeValue("PDF")
      });
    } else if (e === "Video") {
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["Type"] = 'VIDEO';
      iDataOptons.Filters["IsActive"] = statusValue;
      iDataOptons.Filters["SearchText"] = serarchField;
      GetBciProduct(iDataOptons).then((data) => {
        setBciData(data?.data);
        setTypeValue("VIDEO")
      });
    }
    else if (e === undefined) {
      setTypeValue(null)
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["SearchText"] = serarchField;
      iDataOptons.Filters["Type"] = '';
      iDataOptons.Filters["IsActive"] = statusValue;
      GetBciProduct(iDataOptons).then((data) => {
        setBciData(data?.data);
      });
    }

  };

  const onChangeStatusValues = (e) => {
    if (e === "Active") {
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["IsActive"] = true;
      iDataOptons.Filters["Type"] = typeValue;
      iDataOptons.Filters["SearchText"] = serarchField;
      // "Type": "string",
      // "IsActive": "boolean"

      GetBciProduct(iDataOptons).then((data) => {
        setBciData(data?.data);
        setStatusValue("Active")
      });
    } else if (e === "Deactive") {
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["IsActive"] = false;
      iDataOptons.Filters["Type"] = typeValue;
      iDataOptons.Filters["SearchText"] = serarchField;

      GetBciProduct(iDataOptons).then((data) => {
        setBciData(data?.data);
        setStatusValue("Deactive")
      });
    }
    else if (e === undefined) {
      setStatusValue(null)
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["Type"] = typeValue;
      iDataOptons.Filters["IsActive"] = '';
      iDataOptons.Filters["SearchText"] = serarchField;
      GetBciProduct(iDataOptons).then((data) => {
        setBciData(data?.data);
      });
    }
  };

  useEffect(() => {
    document.title = "BCI Products";
    setStatusValue(null);
    setTypeValue(null);
    let iDataOptons = { ...dataOptions };
    iDataOptons.Filters['SearchText'] = '';
    iDataOptons.Filters["Type"] = '';
    iDataOptons.Filters["IsActive"] = '';
    iDataOptons.Filters["PageNo"] = 0;
    iDataOptons.Filters["RecordsPerPage"] = 10;
    setDataOptions(iDataOptons);
    setDataOptions(defaultDataOption);
  }, []);


  useEffect(() => {
    setloading(true)
    GetBciProduct(dataOptions).then((data) => {
      setBciData(data?.data);
      setTotalPage(data?.recordsCount)
    });
    setloading(false)
  }, [dataOptions]);

  const updateDataOptionsValue = (field, value) => {
    if (value == '') {
      setSerarchField(null)
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters['SearchText'] = '';
      iDataOptons.Filters["Type"] = typeValue;
      iDataOptons.Filters["IsActive"] = statusValue;
      setDataOptions(iDataOptons);
    } else {
      let iDataOptons = { ...dataOptions };
      iDataOptons.Filters["SearchText"] = serarchField;
      iDataOptons.Filters["Type"] = typeValue;
      iDataOptons.Filters["IsActive"] = statusValue;
      setDataOptions(iDataOptons);
    }

  };

  const handleSearch = (value) => {
    updateDataOptionsValue("SearchText", value);
  };

  const updateitem = (item) => {
    navigate("/add-products", { state: item });
  };

  const addNewFile = () => {
    navigate("/add-products");
  };

  function copy(url) {
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  }

  const onChange = (page, pageSize) => {
    let iDataOptons = { ...dataOptions };
    iDataOptons.Filters["PageNo"] = page;
    iDataOptons.Filters["RecordsPerPage"] = pageSize;
    setDataOptions(iDataOptons);
    // setDataOptions({
    //   Filters: {},
    //   SortBy: "Name",
    //   RecordsPerPage: pageSize,
    //   PageNo: page,
    // });
  };

  const onResetClick = () => {
    setSerarchField(null);
    setStatusValue(null);
    setTypeValue(null);
    let iDataOptons = { ...dataOptions };
    iDataOptons.Filters = {};
    setDataOptions(iDataOptons);
  };
const getThumbnail  = (ThumbnailUrl) => {
  var thumbnail = youtubeThumbnail(ThumbnailUrl);
  return thumbnail.high.url;
  
}
  return (
    <PageLayout>
      <Spin spinning={loading}>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <PageTitle title="BCI Product"></PageTitle>
          <div style={{ display: "flex" }}>
            <div>
              <Button className="btnAddNew" onClick={addNewFile}>
                Add New
              </Button>
            </div>
          </div>
        </div>
        <div className="distance-div-top" style={{ maxWidth: "25vw" }}>
          <Search
            placeholder="Search Title , Description , File Name"
            enterButton
            value={serarchField}
            className="searchButton"
            onSearch={handleSearch}
            onChange={(e) => setSerarchField(e.target.value)}
            allowClear={true}
          />
        </div>
        <div className="d-flex users-filters distance-div-top" >
          <Select
            options={Dropdowns}
            value={typeValue}
            onChange={(e) => onChangeValues(e)}
            allowClear={true}
            fieldNames={{ label: "label", value: "Name" }}
            placeholder={"Select Type"}
          />
          <Select
            options={StatusDropdowns}
            value={statusValue}
            onChange={(e) => onChangeStatusValues(e)}
            allowClear={true}
            fieldNames={{ label: "label", value: "Name" }}
            placeholder={"Select Status"}
          />
          <Button onClick={onResetClick}>Reset</Button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        </div>
        <div className="list-item">
          {bciData?.map((item) => (
            <Card className="main-card-bci">
              <div className="ant-card-bci" style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="inner-card card " style={{ borderRadius: "0px" }}>
                  
                  {item?.ContentType_Enum == "VIDEO" && (
                    <img
                      style={{ width: "5rem", margin: "auto" }}
                      src={getThumbnail(item?.Url)}
                      alt="video"
                      srcset=""
                    />

                    //  <img
                    //   style={{ width: "5rem", margin: "auto" }}
                    //   src={youtubeThumbnail()}
                    //   alt="video"
                    //   srcset=""
                    // />
                    // <div className="thumbnail">
                    // <VideoThumbnail
                    // videoUrl= "https://www.youtube.com/watch?v=6sUzascpLbc"
                    // thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    // width={10}
                    // height={10}         
                    // />
                    // </div>

                  )}
                  {item?.ContentType_Enum == "PDF" && (

                    <img
                      style={{ width: "5rem" }}
                      src={item?.ThumbnailUrl}
                      alt="pdf"
                      srcset=""
                    />
                  )}
                </div>
                <div className="display: flex; justify-content: space-between; p-2">
                  {item?.Status_Enum == "PUBLISH" && (
                    <div className="publish-card card">
                      <h6>{item?.Status_Enum}</h6>
                    </div>
                  )}
                     {item?.Status_Enum == "DRAFT" && (
                    <div className="publishdraft-card card">
                      <h6>{item?.Status_Enum}</h6>
                    </div>
                   )}

                  <div className="">
                    <div>
                      <h6>{item?.Title}</h6>
                    </div>
                    <div>
                      <span>{item?.Description}</span>
                    </div>
                  </div>
                  <div className="button-bci mt-3" >
                    <Button
                      onClick={() => updateitem(item)}
                    >
                      Update
                    </Button>
                    <Button
                      style={{ marginLeft: "1px" }}
                      onClick={() => copy(item?.Url)}
                    >
                      Open URL
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="pagination-css">
          <Pagination defaultCurrent={1} total={totalPage} onChange={onChange} />
        </div>
      </Spin>
    </PageLayout>
  );
};

export default BciProductsList;
