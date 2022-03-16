import { oddEvenExample } from "../utils/example";
import { Info } from "../interface/models";

const info: Info[] = [{ name: "Israel", username: "israx" },{name: "Andrew", username: 'elchic00'}, {name: "Neil", username: "neil-kuldip"}];

export class Api {
  static example = () => {
    return new Promise<string>((resolve, rejects) => {
      setTimeout(() => {
        if (oddEvenExample() % 2 === 0) {
          resolve("LogoComp resolved");
        } else {
          rejects("LogoComp rejected");
        }
      }, 1000);
    });
  };

  static teamMembers = async (): Promise<Info[]> => {
    return info;
  };
}
