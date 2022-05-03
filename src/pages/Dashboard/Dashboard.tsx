import { Box } from "@mui/material";
import { sendNotification } from "../../utils/sendNotification";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
export const Dashboard = () => {
  const { user } = useUser();

  console.log(user);
  useEffect(() => {}, []);
  return <Box>Dashboard</Box>;
};
