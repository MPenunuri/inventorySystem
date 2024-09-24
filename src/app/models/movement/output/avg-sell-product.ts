export interface AvgSellProductI {
  productId: number;
  productName: string;
  productCategoryId: number;
  productCategory: string;
  productSubcategoryId: number;
  productSubcategory: string;
  productPresentation: string;
  sellType: number;
  averageSellValue: number;
  sellCurrency: string;
  sells: number;
}
