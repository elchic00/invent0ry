import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

type LocationsMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type ItemsMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type BusinessMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class Locations {
  readonly id: string;
  readonly name?: string | null;
  readonly street?: string | null;
  readonly town?: string | null;
  readonly zip?: number | null;
  readonly owner?: string | null;
  readonly Items?: (Items | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Locations, LocationsMetaData>);
  static copyOf(
    source: Locations,
    mutator: (
      draft: MutableModel<Locations, LocationsMetaData>
    ) => MutableModel<Locations, LocationsMetaData> | void
  ): Locations;
}

export declare class Items {
  readonly id: string;
  readonly name?: string;
  readonly itemCount?: number;
  readonly picture?: string;
  readonly sku?: string;
  readonly expire?: string;
  readonly price?: number;
  readonly owner?: string;
  readonly locationsID: string;
  readonly businessID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Items, ItemsMetaData>);
  static copyOf(
    source: Items,
    mutator: (
      draft: MutableModel<Items, ItemsMetaData>
    ) => MutableModel<Items, ItemsMetaData> | void
  ): Items;
}

export declare class Business {
  readonly id: string;
  readonly name?: string;
  readonly currency?: string;
  readonly owner?: string;
  readonly Locations?: Locations;
  readonly Items?: (Items | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly businessLocationsId?: string | null;
  constructor(init: ModelInit<Business, BusinessMetaData>);
  static copyOf(
    source: Business,
    mutator: (
      draft: MutableModel<Business, BusinessMetaData>
    ) => MutableModel<Business, BusinessMetaData> | void
  ): Business;
}
