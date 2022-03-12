import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box } from "@mui/material";
// add to existing imports
import Amplify from "aws-amplify";
import config from "../../aws-exports";
import { SideBar } from "../SideBar";

export const AuthenticatorComp = () => {
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
// Email, google, and facebook auth loaded in from amplify settings in aws-export
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Box sx={{ height: "100vh", width: "100vw" }}>
          <SideBar signOut={signOut} />
        </Box>
      )}
    </Authenticator>
  );
};
