import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import PageLayout from "../Layout/pageLayout";
import Search from "antd/es/input/Search";
import GetFeedbackApi from "../../Api/getFeedbackApi";
import { sortingComparator } from "../../Utils/constants";
import { Button, notification, Pagination } from "antd";
import { ExportExcel } from "../../Hoc/ExportExcel";

const FeedbackGrid = () => {
  const [colData, setColData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [searchedValue, setSearchedValue] = useState();
  const [pageNumber, setPageNumber] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const [totalPage, setTotalPage] = useState(500);
  const dataOption = {
    Filters: {
      SearchText: searchedValue
    },
    SortBy: "",
    RecordsPerPage: pageSize,
    PageNo: pageNumber
  }

  useEffect(() => {
    document.title = "Training Assessment";
  }, []);

  useEffect(() => {
    GetFeedbackApi(dataOption).then((data) => {
      if (data?.fields !== null) {
        setColData(
          data?.fields?.map((e) => ({ ...e, comparator: sortingComparator }))
        );
      }
      setTotalPage(data?.noOfrecords);
      setRowData(data?.rows);
    });
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      filter: false,
      sortable: true,
    };
  }, []);

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };

  const handleSearch = (value) => {
    let iDataOptons = { ...dataOption };
    iDataOptons.Filters["SearchText"] = value;
    iDataOptons.RecordsPerPage = pageSize;
    iDataOptons.PageNo = pageNumber;
    GetFeedbackApi(iDataOptons).then((data) => {
      if (data?.fields !== null) {
        setColData(data?.fields);
      }
      setTotalPage(data?.noOfrecords);
      setRowData(data?.rows);
    });
  };

  const downloadExcel = () => {
    let iDataOptons = { ...dataOption };
    iDataOptons.Filters["SearchText"] = searchedValue;
    iDataOptons.GetAllRecords = true;
    GetFeedbackApi(iDataOptons).then((data) => {
      ExportExcel(data?.rows, "feedback_details");
      notification.success({
        message: "Downloading...",
        duration: 5,
      });
    });
  };

  const onChange = (page, pageSize) => {
    setPageNumber(page);
    setPageSize(pageSize);
    // setDataOption({
    //   Filters: {
    //     SearchText: searchedValue
    //   },
    //   SortBy: "",
    //   RecordsPerPage: pageSize,
    //   PageNo: page
    // })
    let iDataOptons = { ...dataOption };
    iDataOptons.Filters["SearchText"] = searchedValue;
    iDataOptons.RecordsPerPage = pageSize;
    iDataOptons.PageNo = page;
    
    GetFeedbackApi(iDataOptons).then((data) => {
      setTotalPage(data?.noOfrecords);
      setRowData(data?.rows);
    });
  };

  return (
    <PageLayout pageTitle="Users">
      <h5 style={{ marginBottom: "25px" }}>Training Assessment</h5>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="distance-div-top" style={{ maxWidth: "25vw" }}>
          <Search
            placeholder="Search Name , Phone Number, Trainer Name"
            enterButton
            value={searchedValue}
            className="searchButton"
            onChange={(e) => setSearchedValue(e.target.value)}
            onSearch={handleSearch}
          />
        </div>
        <div className="btn-download-xl">
          <Button htmlType="submit" onClick={() => downloadExcel()}>
            Download Excel
          </Button>
        </div>
      </div>
      <div className=" distance-div-top feedback-grid ag-theme-alpine distance-div-top">
        <AgGridReact
          rowData={rowData}
          columnDefs={colData}
          suppressContextMenu={true}
          suppressHorizontalScroll={false}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
      <div className="pagination-css">
        <Pagination defaultCurrent={1} total={totalPage} onChange={onChange} />
      </div>
    </PageLayout>
  );
};

export default FeedbackGrid;
