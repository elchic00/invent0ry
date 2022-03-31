export interface ItemDetailsInputs {
  itemName?: string;
  locationName?: string;
  businessName?: string;
  count?: number;
  picture?: string;
  sku?: string;
  expirationDate?: string;
  price?: number;
  locationsID?: string| undefined;
  businessID?: string | undefined;
}
