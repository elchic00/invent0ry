import { CircularProgress, Modal } from "@mui/material";
import { useEffect } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { LocalStorage } from "../../services";
import { useNavigate } from "react-router-dom";
export const LoaderComponent = ({ user }: { user: CognitoUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    LocalStorage.setUser(user);
    navigate("/user/dashboard");
  }, []);
  return <CircularProgress />;
};
