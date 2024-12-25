import { Button, Modal, Typography } from "antd";
import React from "react";

const DeavtiveUserModal = ({ isModalOpen, cancelModal }) => {
  const handleOk = () => {
    cancelModal();
  };

  const footer = () => {
    return (
      <div>
        <Button
          className="footerCancel"
          key="back"
          onClick={() => cancelModal()}
        >
          {"Cancel"}
        </Button>
        <Button
          className="deleteButton"
          key="submit"
          onClick={handleOk}
          type="primary"
        >
          {"Deactive"}
        </Button>
      </div>
    );
  };
  return (
    <div>
      <Modal
        onCancel={cancelModal}
        open={isModalOpen}
        footer={footer()}
        closable={true}
        maskClosable={false}
      >
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          Do you want to deactive this user ?
        </Typography>
      </Modal>
    </div>
  );
};

export default DeavtiveUserModal;
