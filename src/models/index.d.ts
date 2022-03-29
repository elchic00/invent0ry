import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LocationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BusinessMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ItemsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Locations {
  readonly id: string;
  readonly name?: string;
  readonly street?: string;
  readonly town?: string;
  readonly zip?: number;
  readonly Business?: Business;
  readonly Items?: (Items | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly locationsBusinessId?: string;
  constructor(init: ModelInit<Locations, LocationsMetaData>);
  static copyOf(source: Locations, mutator: (draft: MutableModel<Locations, LocationsMetaData>) => MutableModel<Locations, LocationsMetaData> | void): Locations;
}

export declare class Business {
  readonly id: string;
  readonly name?: string;
  readonly location?: string;
  readonly currency?: string;
  readonly Items?: (Items | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Business, BusinessMetaData>);
  static copyOf(source: Business, mutator: (draft: MutableModel<Business, BusinessMetaData>) => MutableModel<Business, BusinessMetaData> | void): Business;
}

export declare class Items {
  readonly id: string;
  readonly name?: string;
  readonly itemCount?: number;
  readonly picture?: string;
  readonly sku?: string;
  readonly expire?: string;
  readonly price?: number;
  readonly locationsID: string;
  readonly businessID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Items, ItemsMetaData>);
  static copyOf(source: Items, mutator: (draft: MutableModel<Items, ItemsMetaData>) => MutableModel<Items, ItemsMetaData> | void): Items;
}