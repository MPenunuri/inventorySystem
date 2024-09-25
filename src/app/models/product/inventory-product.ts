import { MinimumStockI } from '../minimum-stock/minimum-stock';
import { SellingPriceI } from '../selling-price/selling-price';
import { StockI } from '../stock/stock';
import { SubcategoryI } from '../subcategory/subcategory';
import { SupplierI } from '../supplier/supplier';

export interface InventoryProductI {
  id: number;
  name: string;
  subcategory: SubcategoryI;
  stockList: StockI[];
  productPresentation: string;
  suppliers: SupplierI[];
  minimumStock: MinimumStockI;
  sellingPrice: SellingPriceI;
}
