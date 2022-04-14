import { useEffect } from "react";
import { LocalStorage } from "../../services";
import { CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/api";
import { Hub, DataStore, Predicates } from "aws-amplify";

export const RedirectComponent = ({ user }: { user: CognitoUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
      LocalStorage.setUser(user);
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen("datastore", async (capsule) => {
      const {
        payload: { event },
      } = capsule;
 
      // console.log("DataStore event", event, data);
 
      if (event === "ready") {
        getData();
      }
    });
    // Start the DataStore, this kicks-off the sync process.
      DataStore.start();
    return () => {
      removeListener();
    };
  },
    []);


  async function getData() {
    const locations = await API.listLocations();
    const business = await API.getBusinessByUsername();
    const promise = (await Promise.all([locations, business])) as any[];
    console.log(promise)
    const isRedirected = promise.includes(null || undefined);

    if (isRedirected) return navigate("/user/walkthrough");

    return navigate("/user/dashboard");
  }

  return <div>Loading</div>;
};
