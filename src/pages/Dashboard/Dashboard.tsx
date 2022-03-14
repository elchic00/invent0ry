import { Box } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

export const Dashboard = () => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const resp = await Auth.currentAuthenticatedUser();
    console.log(resp);
  }

  return <Box>Dashboard</Box>;
};
