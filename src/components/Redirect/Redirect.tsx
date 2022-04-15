import { useEffect } from "react";
import { LocalStorage } from "../../services";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import { Hub, DataStore } from "aws-amplify";
import { LinearProgress } from "@mui/material";

export const RedirectComponent = ({ user }: { user: CognitoUser }) => {
  const navigate = useNavigate();

  function syncModels() {
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen("datastore", async (capsule) => {
      const { payload: { event } } = capsule;
      // console.log("DataStore event", event, data); //show events as data store syncs with models
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
      LocalStorage.setUser(user);
      syncModels();
  },[]);


  async function getData() {
    const locations = await API.listLocations();
    const business = await API.getBusinessByUsername();
    const promise = (await Promise.all([locations, business])) as any[];
    const isRedirected = promise.includes(null || undefined);

    if (isRedirected) return navigate("/user/walkthrough");

    return navigate("/user/dashboard");
  }

  return <LinearProgress/>//<div>Loading...</div>;
};
