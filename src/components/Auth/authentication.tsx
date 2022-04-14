import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { lazy, Suspense } from "react";

const RedirectComponent = lazy(() =>
  import("../Redirect").then(({ RedirectComponent }) => ({
    default: RedirectComponent,
  }))
);

export const AuthenticatorComp = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Suspense fallback={<div>Loading...</div>}>
          <RedirectComponent user={user} />
        </Suspense>
      )}
    </Authenticator>
  );
};
