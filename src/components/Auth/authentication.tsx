import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { RedirectComponent } from "../Redirect";

export const AuthenticatorComp = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => <RedirectComponent user={user} />}
    </Authenticator>
  );
};
