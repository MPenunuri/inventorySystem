import { UserI } from './user';

export interface UserDataI extends UserI {
  id: number;
  registeredCategories: number;
  registeredSubcategories: number;
  registeredProducts: number;
  registeredMovements: number;
  registeredLocations: number;
  registeredStocks: number;
  registeredSuppliers: number;
  registeredProductSupplierRelations: number;
  registeredCurrencies: number;
}
