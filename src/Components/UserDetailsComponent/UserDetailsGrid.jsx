import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import UserDetailsGrid from "../../Api/UserDetailsApi";
import Search from "antd/es/input/Search";
import { Button, Select, Pagination } from "antd";
import { Status, sortingComparator } from "../../Utils/constants";
import GetStateApi from "../../Api/GetStateApi";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../Layout/pageLayout";
import PageTitle from "../Layout/pageTitle";
import GetRolesApi from "../../Api/GetRolesApi";
import EditUser from "./EditUser";
import { GetDistrictApi } from "../../Api/GetDistrictApi";
import { GetBlockApi } from "../../Api/GetBlockApi";
import { notification } from "antd";
import { ExportExcel } from "../../Hoc/ExportExcel";
import { HasPermission, PERMISSION } from "../../Utils/enum";
import { useSelector } from "react-redux";
const defaultDataOption = {
  Filters: {},
  SortBy: "Name",
  RecordsPerPage: 10000,
  PageNo: 0,
};

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataOptions, setDataOptions] = useState(defaultDataOption);
  const [gridData, setGridData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [serarchField, setSerarchField] = useState("");
  const [selectedRole, setSelectedRole] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedBlock, setSelectedBlock] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [totalPage, setTotalPage] = useState(500);
  const updateDataOptionsValue = (field, value) => {
    let iDataOptons = { ...dataOptions };
    iDataOptons.Filters[field] = value;
    iDataOptons.Filters["SearchText"] = serarchField;
    setDataOptions(iDataOptons);
  };
  const handleDropdownChange = (value, dropdownName) => {
    switch (dropdownName) {
      case "role":
        setSelectedRole(value);
        updateDataOptionsValue("RoleId", value);
        break;
      case "state":
        setSelectedState(value);
        updateDataOptionsValue("StateId", value);
        break;
      case "district":
        setSelectedDistrict(value);
        updateDataOptionsValue("DistrictId", value);
        break;
      case "block":
        setSelectedBlock(value);
        updateDataOptionsValue("BlockId", value);
        break;
      case "status":
        setSelectedStatus(value);
        updateDataOptionsValue("IsActive", value);
        break;
      default:
        break;
    }
  };
  const permissions = useSelector(
    (state) => state.myDetailsReducer?.Permissions
  );
  useEffect(() => {
    document.title = "Users";
    GetRolesApi().then((data) => {
      setRoles(data);
    });
    GetStateApi().then((data) => {
      setStates(data);
    });
    GetDistrictApi().then((data) => {
      setDistricts(data);
    });
    GetBlockApi().then((data) => {
      setBlocks(data);
    });
  }, []);

  useEffect(() => {
    document.title = "Users";
    setDataOptions(defaultDataOption);
  }, []);

  useEffect(() => {
    UserDetailsGrid(dataOptions).then((data) => {
      setGridData(data?.records);
      setTotalPage(data?.noOfRecords)
    });
  }, [dataOptions]);

  useEffect(() => {
    setDataOptions({
      Filters: {},
      SortBy: "Name",
      RecordsPerPage: 10,
      PageNo: 1,
    });
  }, [location.pathname]);

  const handleSearch = (value) => {
    updateDataOptionsValue("SearchText", value);
  };

  const checkForLocation = (locationData) => {
    let location = "NA";
    if (location && locationData.state.name) {
      location = locationData.state.name;

      if (locationData.district.name) {
        location += `-${locationData.district.name}`;
        if (locationData.block.name) {
          location += `-${locationData.block.name}`;
        }
      }
    }
    return location;
  };

  const rowData = useMemo(() => {
    return gridData?.map((userData) => {
      return {
        UserId: userData.UserId,
        Name: userData.Name,
        PhoneNumber: userData.PhoneNumber,
        EmailId: userData.EmailId,
        IsActive: userData.IsActive,
        Role: userData.Role.userRole,
        Location: checkForLocation(userData.Location),
      };
    });
  }, [gridData]);

  const handleIsActive = (params) => {
    const isActive = params?.data?.IsActive;
    return <span>{isActive ? "Active" : "In-Active"}</span>;
  };

  const addUser = () => {
    GetRolesApi();
    navigate("/user-details");
  };

  const columnDefs = [
    {
      field: "Name",
      cellRenderer: (e) => EditUser(e),
      comparator: sortingComparator,
    },
    {
      field: "PhoneNumber",
    },
    {
      field: "EmailId",
      headerName: "Email Address",
      comparator: sortingComparator,
    },
    {
      field: "Role",
      comparator: sortingComparator,
    },
    {
      field: "Location",
      comparator: sortingComparator,
    },
    {
      field: "IsActive",
      headerName: "Status",
      cellRenderer: handleIsActive,
      cellRendererParams: {
        additionalField: "IsActive",
      },
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: false,
      suppressMenu: true,
      floatingFilter: false,
      sortable: true,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
    };
  }, []);

  const onResetClick = () => {
    setSerarchField("");
    setSelectedRole(null);
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedBlock(null);
    setSelectedStatus(null);
    let iDataOptons = { ...dataOptions };
    iDataOptons.Filters = {};
    setDataOptions(iDataOptons);
  };

  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
  };
  const downloadExcel = () => {
    let iDataOptons = { ...dataOptions };
    console.log(dataOptions);
    iDataOptons['GetAllRecords'] = true
    setDataOptions(iDataOptons);
    UserDetailsGrid(iDataOptons)
      .then((data) => {
        console.log(data);
        let excelData = data['records'].map((userData) => {
          return {
            UserId: userData.UserId,
            Name: userData.Name,
            PhoneNumber: userData.PhoneNumber,
            EmailId: userData.EmailId,
            IsActive: userData.IsActive,
            Role: userData.Role.userRole,
            Location: checkForLocation(userData.Location),
          };
        });
        ExportExcel(excelData, "user");
        notification.success({
          message: "Downloading...",
          duration: 5,
        });
      })
      .catch((e) => {
        notification.error({
          message: "Your session is expired please login again",
          duration: 5,
        });
      });
  };
  const onChange = (page, pageSize) => {
    setDataOptions({
      Filters: dataOptions.Filters,
      SortBy: "Name",
      RecordsPerPage: pageSize,
      PageNo: page,
    });
  };
  return (
    <PageLayout pageTitle="Users">
      <div className="d-flex justify-content-between">
        <PageTitle title="Users"></PageTitle>
        <div style={{ display: "flex" }}>
          {HasPermission(permissions, PERMISSION.CanManageUsers) && (
            <div>
              <Button className="btnAddUser" onClick={addUser}>
                Create User
              </Button>
            </div>
          )}
          <div className="btn-download-xl">
            <Button htmlType="submit" onClick={() => downloadExcel()}>
              Download Excel
            </Button>
          </div>
        </div>
      </div>
      <div className="distance-div-top" style={{ maxWidth: "25vw" }}>
        <Search
          placeholder="Search Name , Phone Number, Email Address"
          enterButton
          value={serarchField}
          className="searchButton"
          onSearch={handleSearch}
          onChange={(e) => setSerarchField(e.target.value)}
          allowClear={true}
        />
      </div>
      <div className="d-flex justify-content-between users-filters distance-div-top">
        <Select
          value={selectedRole}
          options={roles}
          onChange={(value) => handleDropdownChange(value, "role")}
          allowClear={true}
          fieldNames={{ label: "Role", value: "id" }}
          placeholder={"Select Role"}
        />
        <Select
          value={selectedState}
          options={states}
          onChange={(value) => handleDropdownChange(value, "state")}
          allowClear={true}
          fieldNames={{ label: "State", value: "id" }}
          placeholder={"Select State"}
        />
        <Select
          value={selectedDistrict}
          options={districts}
          onChange={(value) => handleDropdownChange(value, "district")}
          allowClear={true}
          fieldNames={{ label: "District", value: "id" }}
          placeholder={"Select District"}
        />
        <Select
          value={selectedBlock}
          options={blocks}
          onChange={(value) => handleDropdownChange(value, "block")}
          allowClear={true}
          fieldNames={{ label: "Block", value: "id" }}
          placeholder={"Select Block"}
        />
        <Select
          value={selectedStatus}
          options={Status}
          defaultActiveFirstOption={true}
          onChange={(value) => handleDropdownChange(value, "status")}
          placeholder={"Select Status"}
          allowClear={true}
        />
        <Button onClick={onResetClick}>Reset</Button>
      </div>
      <div className=" distance-div-top users-grid ag-theme-alpine distance-div-top">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
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

export default UserDetails;
