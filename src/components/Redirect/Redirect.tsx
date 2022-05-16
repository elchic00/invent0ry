import { useEffect } from "react";
import { LocalStorage } from "../../services";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import { Hub, DataStore } from "aws-amplify";
import { LinearProgress } from "@mui/material";
import { Business, Category, Locations } from "../../models";

export const RedirectComponent = ({
  user,
}: {
  user: CognitoUser | undefined;
}) => {
  const navigate = useNavigate();

  function syncModels() {
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event },
      } = capsule;

      if (event === "ready") {
        await getData();
      }
    });
    DataStore.start();
    return () => {
      removeListener();
    };
  }

  useEffect(() => {
    user && LocalStorage.setUser(user);
    syncModels();
  }, []);

  async function getData() {
    const locations = await API.listLocations();
    const business = await API.getBusinessByUsername();
    const categories = await API.listCategories();

    if (
      validateData<Locations[]>(locations) ||
      validateData<Business>(business) ||
      validateData<Category[]>(categories)
    )
      return navigate("/user/walkthrough");

    return navigate("/user/dashboard");
  }

  function validateData<T>(data: T[] | T): any {
    if (Array.isArray(data))
      return data === undefined || data === null || data.length < 1;

    return data === undefined || data === null;
  }

  return <LinearProgress />;
};
