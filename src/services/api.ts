import { DataStore } from "aws-amplify";
import { businessType } from "../interface/models/businessType";
import { Business, Locations } from "../models";
import { locationType } from "../interface/models/locationType";
import { Items } from "../models";
export class API {
  static async businessSpecifics(data: businessType) {
    return await DataStore.save(new Business(data));
  }
  static async addLocation(data: locationType) {
    return await DataStore.save(new Locations(data));
  }

  static async getItems() {
    return await DataStore.query(Items);
  }
}
