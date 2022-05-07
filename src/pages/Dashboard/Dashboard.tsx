import { Box } from "@mui/material";
import { sendNotification } from "../../utils/sendNotification";
import { useEffect } from "react";
import { useItems } from "../../context";
import { useBusiness } from "../../hooks";
import { useLocations } from "../../hooks";

export const Dashboard = () => {
  const { locations } = useLocations();
  const { business } = useBusiness();
  return <Box>Dashboard</Box>;
};
