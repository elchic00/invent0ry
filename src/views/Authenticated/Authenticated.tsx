import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

type AuthenticatedProps = {
  children: JSX.Element;
};
export const AuthenticatedView = ({ children }: AuthenticatedProps) => {
  const { user } = useUser();
  console.log(user);

  return !user ? <Navigate to="/" replace={true} /> : <>{children}</>;
};
