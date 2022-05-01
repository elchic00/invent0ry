import { Auth, DataStore } from "aws-amplify";
import { businessType } from "../interface/models/businessType";
import { Business, Locations } from "../models";
import { locationType } from "../interface/models/locationType";
import { Items } from "../models";
import { ItemDetailsInputs } from "../interface/models/itemDetailsInputs";
import { Storage } from "@aws-amplify/storage";
import { useLocations } from "../hooks";

export class API {
  //------------------- Data Store ------------------------

  static async addBusinessSpecifics(data: businessType) {
    return await DataStore.save(new Business(data));
  }
  static async getBusinessByUsername() {
    const user = await Auth.currentUserInfo();
    const business = await DataStore.query(Business, (b) =>
      b.owner("eq", user.username)
    );
    return business[0];
  }

  static async updateBusiness(location: Locations, data: businessType) {
    const original = await this.getBusinessByUsername();
      return await DataStore.save(
        Business.copyOf(original, (updated) => {
          updated.name = data.name;
          updated.Locations = location;
          updated.currency = data.currency;
        })
      );
  }

  static async listLocations() {
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
        updated.zip = Number(data.zip);
      })
    );
  }

  static async listItems() {
    return await DataStore.query(Items);
  }

  static async deleteItem(item: Items) {
    return await DataStore.delete(item);
  }

  static async addItem(item: ItemDetailsInputs) {
    const business = await API.getBusinessByUsername();

    await DataStore.save(
      new Items({
        name: item.itemName,
        itemCount: item.count,
        picture: item.picture,
        sku: item.sku,
        expire: item.expirationDate?.slice(0, 16),
        price: item.price,
        locationsID: item.locationName || "",
        businessID: business.id || "",
      })
    );
  }

  static async updateItem({ original, data }: { original: Items; data: ItemDetailsInputs; }){
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

  // ----------------------- S3 Buckets ------------------------------
  static async uploadItemImage({
    file,
    fileName,
  }: {
    file: any;
    fileName: string;
  }) {
    return await Storage.put(fileName, file, { level: "public" });
  }

  static async getItemImage(key: string) {
    return await Storage.get(key, { level: "public" });
  }

  static async removeItemImage(key: string) {
    return await Storage.remove(key);
  }
}
