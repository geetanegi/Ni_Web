import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import PageLayout from "../Layout/pageLayout";
import Search from "antd/es/input/Search";
import { sortingComparator } from "../../Utils/constants";
import GetChildApi from "../../Api/getChildDetails";

const ChildDetailsGrid = () => {
  const [colData, setColData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [searchedValue, setSearchedValue] = useState();

  useEffect(() => {
    document.title = "child details";
  }, []);
  useEffect(() => {
    GetChildApi().then((data) => {
      if (data?.fields !== null) {
        setColData(
          data?.fields?.map((e) => ({ ...e, comparator: sortingComparator }))
        );
      }
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
  const handleSearch = (searchedValue) => {
    GetChildApi(searchedValue).then((data) => {
      if (data?.fields !== null) {
        setColData(data?.fields);
      }
      setRowData(data?.rows);
    });
  };
  return (
    <PageLayout pageTitle="Users">
      <h5 style={{ marginBottom: "25px" }}>Child Details</h5>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="distance-div-top" style={{ maxWidth: "25vw" }}>
          <Search
            placeholder="Search Name , Father Name, Trainer Name"
            enterButton
            value={searchedValue}
            className="searchButton"
            onSearch={handleSearch}
            onChange={(e) => setSearchedValue(e.target.value)}
          />
        </div>
      </div>
      <div className=" distance-div-top child-grid ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={colData}
          suppressContextMenu={true}
          pagination={true}
          paginationPageSize={10}
          suppressHorizontalScroll={false}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        ></AgGridReact>
      </div>
    </PageLayout>
  );
};

export default ChildDetailsGrid;
