import { Modal, Box } from "@mui/material";
import React, { useEffect } from "react";
import { CenteredComponent } from "../CenteredComponent";
import { useModal } from "../../context";

export const ModalComponent = () => {
  const { component, open, setComponent, theme } = useModal();

  const handleClose = () => setComponent(null);

  return (
    <Modal
      open={component != null ? open : false}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CenteredComponent width={theme.width} height={theme.height}>
        {component != null ? component : <></>}
      </CenteredComponent>
    </Modal>
  );
};
