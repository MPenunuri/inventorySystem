import { StandardProductI } from './standard-product';

export interface LocationProductI {
  productId: number;
  productName: string;
  categoryId: number;
  categoryName: string;
  subcategoryId: number;
  subcategoryName: string;
  productPresentation: string;
  minimumStock: number;
  retailPrice: number;
  wholesalePrice: number;
  priceCurrencyId: number;
  priceCurrency: string;
  stockLocationId: number;
  stockLocationName: string;
  stockLocationAddress: string;
  stockLocationQuantity: number;
  stockLocationMaximumStorage: number;
}
