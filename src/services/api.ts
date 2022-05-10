import { Auth, DataStore, Predicates, SortDirection } from "aws-amplify";
import { businessType } from "../interface/models/businessType";
import { CategoryType } from "../interface/models/categoryType";
import { Business, Category, Locations } from "../models";
import { locationType } from "../interface/models/locationType";
import { Items } from "../models";
import { ItemDetailsInputs } from "../interface/models/itemDetailsInputs";
import { Storage } from "@aws-amplify/storage";
import internal from "stream";

export class API {
  //------------------- DataStore ------------------------

  //___________________CATEGORIES__________________

  static async listCategories() {
    return await DataStore.query(Category);
  }

  static async addCategory(data: CategoryType) {
    return await DataStore.save(
      new Category({
        name: data.name,
      })
    );
  }

  static async removeCategory(id: string) {
    const category = (await this.getCategoryById(id)) as Category;
    return await DataStore.delete(category);
  }

  static async getCategoryById(id: string) {
    return await DataStore.query(Category, id);
  }

  static async updateCategory(data: CategoryType) {
    const category = (await this.getCategoryById(
      data.id as string
    )) as Category;
    return await DataStore.save(
      Category.copyOf(category, (updated) => {
        updated.name = data.name;
      })
    );
  }

  //___________________BUSINESS____________________

  static async addBusinessSpecifics(data: businessType) {
    return await DataStore.save(new Business(data));
  }
  static async getBusinessByUsername() {
    const user = await Auth.currentUserInfo();
    // const business = await DataStore.query(Business, (b) =>
    //   b.owner("eq", user.username)
    // );
    const business = await DataStore.query(Business);
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

  //___________________LOCATION____________________

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

  //_____________________ITEMS___________________

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

  static async listItemsByPriceLowestToHighest() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.price(SortDirection.ASCENDING),
    });
  }

  static async listItemsByPriceHighestToLowest() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.price(SortDirection.DESCENDING),
    });
  }

  static async listItemsByQuantityLowestToHighest() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.itemCount(SortDirection.ASCENDING),
    });
  }

  static async listItemsByQuantityHighestToLowest() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.itemCount(SortDirection.DESCENDING),
    });
  }

  static async listItemsFromAZ() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.name(SortDirection.ASCENDING),
    });
  }

  static async listItemsByNewest() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.createdAt(SortDirection.DESCENDING),
    });
  }

  static async listItemsFromZA() {
    return await DataStore.query(Items, Predicates.ALL, {
      sort: (s) => s.name(SortDirection.DESCENDING),
    });
  }

  static async listItemsByRange(min: number, max: number) {
    return await DataStore.query(Items, (c) => c.price("between", [min, max]));
  }

  static async listItemsByItemCount(min: number) {
    return await DataStore.query(Items, (c) => c.itemCount("le", min));
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
