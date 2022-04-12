import { useEffect, useState } from "react";
import { AmplifyAuth } from "../services";
import { CognitoUser } from "amazon-cognito-identity-js";
import { LocalStorage } from "../services";

export const useUser = () => {
  const [user, setUser] = useState<CognitoUser | null>(LocalStorage.getUser());

  useEffect(() => {
    user! && getUser();
  }, []);

  async function getUser() {
    try {
      const data = await AmplifyAuth.getUser();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { user };
};
