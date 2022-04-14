import { useEffect } from "react";
import { LocalStorage } from "../../services";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";

export const RedirectComponent = ({ user }: { user: CognitoUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    LocalStorage.setUser(user);
    getData();
  }, []);

  async function getData() {
    const locations = await API.listLocations();
    const business = await API.getBusinessByUsername();
    const promise = (await Promise.all([locations, business])) as any[];

    const isRedirected = promise.includes(null || undefined);

    if (isRedirected) return navigate("/user/walkthrough");

    return navigate("/user/dashboard");
  }

  return <div>Loading</div>;
};
