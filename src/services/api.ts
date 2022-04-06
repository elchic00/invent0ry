import { DataStore } from "aws-amplify";
import { businessType } from "../interface/models/businessType";
import { Business, Locations } from "../models";
import { locationType } from "../interface/models/locationType";
import { Items } from "../models";
import { ItemDetailsInputs } from "../interface/models/itemDetailsInputs";

export class API {
  static async addBusinessSpecifics(data: businessType) {
    return await DataStore.save(new Business(data));
  }

  static async getLocations() {
    return await DataStore.query(Locations);
  }

  static async addLocation(data: locationType) {
    return await DataStore.save(new Locations(data));
  }

  static async getLocationById(id: string) {
    return await DataStore.query(Locations, id);
  }

  static async deleteLocation(location: Locations) {
    return await DataStore.delete(location);
  }

  static async updateLocation(original: Locations, data: locationType) {
    return await DataStore.save(
      Locations.copyOf(original, (updated) => {
        updated.name = data.name;
        updated.street = data.street;
        updated.town = data.town;
        updated.zip = data.zip;
      })
    );
  }

  static async getItems() {
    return await DataStore.query(Items);
  }

  static async deleteItem(item: Items) {
    return await DataStore.delete(item);
  }

  static async addItem(item: ItemDetailsInputs) {
    await DataStore.save(
      new Items({
        name: item.itemName,
        itemCount: item.count,
        picture: item.picture,
        sku: item.sku,
        expire: item.expirationDate,
        price: item.price,
        locationsID: item.locationName || "",
        businessID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
      })
    );
  }

  static async updateItem({
    original,
    data,
  }: {
    original: Items;
    data: ItemDetailsInputs;
  }) {
    return await DataStore.save(
      Items.copyOf(original, (updated) => {
        updated.name = data.itemName;
        updated.picture = data.picture;
        updated.itemCount = data.count;
        updated.expire = data.expirationDate;
        updated.price = data.price;
      })
    );
  }

  static async getItemById(id: string) {
    return await DataStore.query(Items, id);
  }
}
