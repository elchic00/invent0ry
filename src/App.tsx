import { Outlet } from "react-router-dom";
import { AppRoutes } from "./routes";
import Amplify, {AuthModeStrategyType} from "aws-amplify";
import config from "./aws-exports";
import { ModalComponent } from "./components/Modal";
import { LoaderComponent } from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

//check if localhost
const isLocalhost = window.location.hostname === "localhost";
// split redirect signin and signout strings into correct URIs
const [localRedirectSignIn, productionRedirectSignIn] =
  config.oauth.redirectSignIn.split(",");
const [localRedirectSignOut, productionRedirectSignOut] =
  config.oauth.redirectSignOut.split(",");

// use correct URI in the right env
// Email, google, and facebook auth loaded in from amplify settings in aws-export

const updatedAwsConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
    DataStore: {
        authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
    }
};
Amplify.configure(updatedAwsConfig);
function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Outlet />
      <ModalComponent />
      <LoaderComponent />
      <ToastContainer />
    </div>
  );
}

export default App;
