import { CircularProgress, Modal } from "@mui/material";
import { CenteredComponent } from "../CenteredComponent";
import { useLoader } from "../../context";

export const LoaderComponent = () => {
  const { loading } = useLoader();

  return (
    <Modal
      open={loading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CenteredComponent width="auto">
        <CircularProgress />
      </CenteredComponent>
    </Modal>
  );
};
