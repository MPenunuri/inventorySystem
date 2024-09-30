import { StandardProductI } from './standard-product';

export interface SupplierProductI {
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
  priceCurrency: string;
  supplierId: number;
  supplierName: string;
}
