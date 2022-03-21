import { useEffect } from "react";
import { LocalStorage } from "../../services";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Navigate } from "react-router-dom";
export const RedirectComponent = ({ user }: { user: CognitoUser }) => {
  useEffect(() => {
    LocalStorage.setUser(user);
  }, []);
  return <Navigate to="/user/dashboard" />;
};
