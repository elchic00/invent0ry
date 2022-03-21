import { Box } from "@mui/material";
import { useModal } from "../../context";
import { useEffect } from "react";

export const Inventory = () => {
  const { setComponent } = useModal();

  useEffect(() => {
    setComponent(<div style={{ padding: "1rem" }}>Inventory Modal</div>);
  }, []);
  return <Box>Inventory Page</Box>;
};
