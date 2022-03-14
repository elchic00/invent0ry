import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box } from "@mui/material";
// add to existing imports

import { SideBar } from "../SideBar";

export const AuthenticatorComp = () => {
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
