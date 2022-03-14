import { Outlet } from "react-router-dom";
import { AppRoutes } from "./routes";
import Amplify from "aws-amplify";
import config from "./aws-exports";

const isLocalhost = window.location.hostname === "localhost";
// split redirect signin and signout strings into correct URIs
const [productionRedirectSignIn, localRedirectSignIn] =
  config.oauth.redirectSignIn.split(",");
const [productionRedirectSignOut, localRedirectSignOut] =
  config.oauth.redirectSignOut.split(",");

// use correct URI in the right env
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
};
Amplify.configure(updatedAwsConfig);
function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Outlet />
    </div>
  );
}

export default App;
