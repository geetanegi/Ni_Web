import React from "react";
import ni_logo from "../../Assets/Images/ni_logo.png";
import { LuUser2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "antd";
import logoutApi from "../../Api/logoutApi";
import { useSelector } from "react-redux";
import { HasPermission, PERMISSION } from "../../Utils/enum";
const Header = () => {
  const permissions = useSelector(
    (state) => state.myDetailsReducer?.Permissions
  );
  const myDetails = useSelector((state) => state.myDetailsReducer);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/user-details/${myDetails.UserId}`);
  };
  const hide = (value) => {
    if (value === "editProfile") {
      handleEdit();
    } else if (value === "ChangePassword") {
      navigate("/change-password");
    } else if (value === "Logout") {
      logoutApi(navigate);
    }
  };
  const content = (
    <div style={{ cursor: "pointer" }}>
      <hr />
      <span onClick={() => hide("editProfile")} style={{ border: "none" }}>
        Edit Profile
      </span>
      <hr />
      <span onClick={() => hide("ChangePassword")} style={{ border: "none" }}>
        Change Password
      </span>
      <hr />
      <span onClick={() => hide("Logout")} style={{ border: "none" }}>
        Logout
      </span>
    </div>
  );
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow ">
      <div className="container-fluid">
        <a className="navbar-brand">
          {HasPermission(permissions, PERMISSION.CanAccessUserManagement) ? (
            <Link to="/users">
              <img className="NavLogo" src={ni_logo} alt="application branding" />
            </Link>
          ) : (
            <Link to="/dashboard">
              <img className="NavLogo" src={ni_logo} alt="application branding" />
            </Link>
          )}</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav active">
            {HasPermission(permissions, PERMISSION.CanAccessUserManagement) && (
              <Link to="/users" className="linkCss">
                {"Users"}
              </Link>
            )}
            {HasPermission(permissions, PERMISSION.CanViewAllFeedbacks) && (
              <Link to="/feedbacks" className="linkCss">
                {"Training Assessment"}
              </Link>
            )}
            {/* {HasPermission(permissions, PERMISSION.CanViewDashboard) && (
              <Link to="/dashboard" className="linkCss">
                {"Dashboard"}
              </Link>
            )} */}
              {HasPermission(permissions, PERMISSION.CanManageBciProduct) && (
              <Link to="/bci-products" className="linkCss">
                {"BCI Product"}
                </Link>
                )}
            {HasPermission(permissions, PERMISSION.CanViewAllSubmittedChecklist) && (
              <Link to="/checklist" className="linkCss">
                {"Download Checklist"}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className=" usernameText">
        <label>{myDetails?.Name}</label>
      </div>

      <Popover
        className="nav-link"
        content={content}
        title={myDetails?.Name}
        trigger="click"
      >
        <span className="usernameicon">
          <LuUser2 />
        </span>
      </Popover>
    </nav>
  );
};

export default Header;
