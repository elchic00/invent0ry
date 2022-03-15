import { useEffect, useState } from "react";
import { AmplifyAuth } from "../api";
import { CognitoUser } from "amazon-cognito-identity-js";

export const useUser = () => {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const data = await AmplifyAuth.getUser();
      setUser(data);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }

  return { user };
};
