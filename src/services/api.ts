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

  static async addItem() {
    await DataStore.save(
      new Items({
        name: "Item 3",
        itemCount: 1020,
        picture: "Lorem ipsum dolor sit amet",
        sku: "Lorem ipsum dolor sit amet",
        expire: "1970-01-01Z",
        price: 1020,
        locationsID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        businessID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
      })
    );
  }
}
