export interface ItemDetailsInputs {
  itemName?: string;
  categoryId?: string;
  locationID: string;
  businessId?: string;
  count?: number;
  picture?: string;
  sku?: string;
  expirationDate?: string | undefined;
  price?: number;
}
