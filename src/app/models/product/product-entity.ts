export interface ProductEntityI {
  user_id: number;
  id: number;
  name: string;
  subcategory_id: number;
  product_presentation: string;
  minimum_stock: number;
  retail_price: number;
  wholesale_price: number;
  price_currency_id: number;
}
