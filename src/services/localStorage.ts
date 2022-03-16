import { CognitoUser } from "amazon-cognito-identity-js";
import { userInfo } from "../constants";
export class LocalStorage {
  static setUser(user: CognitoUser) {
    localStorage.setItem(userInfo.localStorage, JSON.stringify(user));
  }

  static getUser(): CognitoUser | null {
    var user = localStorage.getItem(userInfo.localStorage);

    if (user) return JSON.parse(user);
    return null;
  }

  static deleteUser() {
    localStorage.removeItem(userInfo.localStorage);
  }
}
