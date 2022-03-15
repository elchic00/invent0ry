import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Box } from "@mui/material";

// add to existing imports

import { SideBar } from "../SideBar";

export const AuthenticatorComp = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Box sx={{ height: "100vh", width: "100vw" }}>
          <SideBar />
        </Box>
      )}
    </Authenticator>
  );
};
