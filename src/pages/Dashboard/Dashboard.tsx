import { Box } from "@mui/material";
import { sendNotification } from "../../utils/sendNotification";
import { useEffect } from "react";
export const Dashboard = () => {
  useEffect(() => {
    sendNotification("Dashboard Notification", "error");
  }, []);
  return <Box>Dashboard</Box>;
};
