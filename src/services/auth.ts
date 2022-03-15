import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";

export class AmplifyAuth {
  static async getUser(): Promise<CognitoUser> {
    return Auth.currentAuthenticatedUser();
  }

  static async signOut(): Promise<any> {
    return Auth.signOut();
  }
}
