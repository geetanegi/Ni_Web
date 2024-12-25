import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../Components/LoginComponent/Login";
// import UserDetailsForm from "../Components/UserManagementComponent/UserDetailsForm";
import UserDetailsGrid from "../Components/UserDetailsComponent/UserDetailsGrid";
import PasswordDetails from "../Components/UserManagementComponent/PasswordDetails";
import FeedbackForm from "../Components/Feedback/FeedbackFrom";
import FeedbackSuccess from "../Components/Feedback/FeedbackSuccess";
import FeedbackGrid from "../Components/Feedback/FeedbackGrid";
import PrivateRoute from "./PrivateRoute";
import CheckListGrid from "../Components/CheckListComponent/CheckListGrid";
import BciProductsList from "../Components/BCI_Products/BciProductsList";
import AddBciProducts from "../Components/BCI_Products/AddBciProducts";
import ChildDetailsGrid from "../Components/ChildDetails/ChildDetailsGrid";
import Dashboard from "../Components/DashBoard/Dashboard";
import { useSelector } from "react-redux";
import NoPermission from "../Components/NoPermission/noPermissionPage";
import { HasPermission, PERMISSION } from "../Utils/enum";
import LumenoreCheckList from "../Components/Lumenore/LumenoreCheckListGrid";
import AddUpdateUser from "../Components/UserManagementComponent/AddUpdateUser";
import BeneficaryRegistration from "../Components/Registration/BeneficaryRegistration";
import AddUpdateRoute from "../Components/UserManagementComponent/AddUpdateRoute";

const RouterComponent = () => {
  const permissions = useSelector(
    (state) => state.myDetailsReducer?.Permissions
  );
  console.log(permissions);
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user-details/:userid"
        element={
          <PrivateRoute
            hasPermission={HasPermission(
              permissions,
              PERMISSION.CanManageUsers
            )}
          >
          <AddUpdateRoute />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-details"
        element={
          <PrivateRoute
            hasPermission={HasPermission(
              permissions,
              PERMISSION.CanManageUsers
            )}
          >
          <AddUpdateRoute/>
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute
            hasPermission={HasPermission(
              permissions,
              PERMISSION.CanAccessUserManagement
            )}
          >
            <UserDetailsGrid />
          </PrivateRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <PrivateRoute hasPermission={true}>
            <PasswordDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/feedbacks"
        element={
          <PrivateRoute
            hasPermission={HasPermission(
              permissions,
              PERMISSION.CanViewAllFeedbacks
            )}
          >
            <FeedbackGrid />
          </PrivateRoute>
        }
      />
      <Route
        path="/checklist"
        exact
        element={
          <PrivateRoute
            hasPermission={HasPermission(
              permissions,
              PERMISSION.CanViewAllSubmittedChecklist
            )}
          >
            <CheckListGrid />
          </PrivateRoute>
        }
      />


      {/* <Route
        path="/dashboard"
        exact
        element={
          <PrivateRoute
            hasPermission={HasPermission(
              permissions,
              PERMISSION.CanViewDashboard
            )}
          >
            <Dashboard />
          </PrivateRoute>
        }
      /> */}
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/Registration" element={<BeneficaryRegistration />} />
      <Route path="/lumenore" exact element={<LumenoreCheckList />} />
      <Route path="/feedback-success" element={<FeedbackSuccess />} />
      <Route path="/bci-products" exact element={<BciProductsList />} />
      <Route path="/add-products" exact element={<AddBciProducts />} />
      <Route path="/noPermission" exact element={<NoPermission />} />
      <Route path="/child-details" exact element={<ChildDetailsGrid />} />
    </Routes>
  );
};

export default RouterComponent;
