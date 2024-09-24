export interface ProductUpdate {
  id: number;
  name?: string;
  subcategoryId?: number;
  productPresentation?: string;
  minimumStock?: number;
  retailPrice?: number;
  wholesalePrice?: number;
  priceCurrencyId?: number;
}
