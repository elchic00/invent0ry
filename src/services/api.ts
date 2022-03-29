import { DataStore } from "aws-amplify";
import { businessType } from "../interface/models/businessType";
import { Business, Locations } from "../models";
import { locationType } from "../interface/models/locationType";
import { Items } from "../models";
import { ItemDetailsInputs } from "../interface/models/itemDetailsInputs";


export class API {
  static async getLocations() {
    return await DataStore.query(Locations);
  }

  static async businessSpecifics(data: businessType) {
    return await DataStore.save(new Business(data));
  }
  static async addLocation(data: locationType) {
    return await DataStore.save(new Locations(data));
  }

  static async getItems() {
    return await DataStore.query(Items);
  }

  static async addItem(item: ItemDetailsInputs) {
    await DataStore.save(
      new Items({
        name: item.itemName,
        itemCount: item.count,
        picture: item.picture,
        sku: item.sku,
        expire: "1970-01-01Z",
        price: item.price,
        locationsID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
        businessID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
      })
    );
  }
  static async getLocations(){
    return await DataStore.query(Locations)
  }
}
