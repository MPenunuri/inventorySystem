export interface StandardProductI {
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
}
