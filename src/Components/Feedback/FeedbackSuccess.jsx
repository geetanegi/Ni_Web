import React from "react";
import ni_logo from "../../Assets/Images/NI_1.png";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const FeedbackSuccess = ({ title }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className="NavLogo"
              src={ni_logo}
              alt=" application branding"
            />
          </a>
        </div>
      </nav>
      <div className="center-content">
        <img src={require("../../Assets/Images/Success.png")} />
        <span className="success-text mt-5">SUCCESS !</span>
        <span className="mt-3" style={{ color: "#006580" }}>
          Your feedback has been successfully submitted.
        </span>
        <div className="mt-5">
          <Button
            onClick={() => {
              navigate("/feedback");
            }}
          >
            Submit Another Feedback
          </Button>
        </div>
      </div>
    </>
  );
};

export default FeedbackSuccess;
