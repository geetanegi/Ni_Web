import { Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RESET_USER_FORM_DATA } from "../../Action";
import { store } from "../../store";
import { HasPermission, PERMISSION } from "../../Utils/enum";
import { useSelector } from "react-redux";
export default function EditUser(data) {
  const permissions = useSelector(
    (state) => state.myDetailsReducer?.Permissions
  );
  const navigate = useNavigate();
  const editForm = () => {
    store.dispatch({
      type: RESET_USER_FORM_DATA,
    });

    navigate(`/user-details/${data?.data?.UserId}`);
  };
  const renderCopyAction = () => {
    return (
      <>
        {HasPermission(permissions, PERMISSION.CanManageUsers) ? (
          <span onClick={editForm} className="user-name-link">
            {data?.data?.Name}
          </span>
        ) : (
          <span>{data?.data?.Name}</span>
        )}
      </>
    );
  };

  return (
    <>
      <Row className="actionIcon">{renderCopyAction()}</Row>
    </>
  );
}
