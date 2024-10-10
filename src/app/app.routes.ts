import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/workspace/products/products.component';
import { CategoriesComponent } from './components/workspace/categories/categories.component';
import { ChangeSubcategoryCategoryComponent } from './components/workspace/categories/change-subcategory-category/change-subcategory-category.component';
import { AssignCategoryComponent } from './components/workspace/products/assign-category/assign-category.component';
import { CurrenciesComponent } from './components/workspace/currencies/currencies.component';
import { AssignCurrencyComponent } from './components/workspace/products/assign-currency/assign-currency.component';
import { LocationsComponent } from './components/workspace/locations/locations.component';
import { SuppliersComponent } from './components/workspace/suppliers/suppliers.component';
import { ProductsManagementComponent } from './components/workspace/suppliers/products-management/products-management.component';
import { ProductComponent } from './components/workspace/products/product/product.component';
import { AddAcquisitionComponent } from './components/workspace/movements/add-movement/add-entry/add-acquisition/add-acquisition.component';
import { AddTransferComponent } from './components/workspace/movements/add-movement/add-transfer/add-transfer.component';
import { AddCustomerReturnComponent } from './components/workspace/movements/add-movement/add-entry/add-customer-return/add-customer-return.component';
import { AddEntryAdjustmentComponent } from './components/workspace/movements/add-movement/add-entry/add-entry-adjustment/add-entry-adjustment.component';
import { AddSaleComponent } from './components/workspace/movements/add-movement/add-output/add-sale/add-sale.component';
import { AddInternalConsumptionComponent } from './components/workspace/movements/add-movement/add-output/add-internal-consumption/add-internal-consumption.component';
import { AddSupplierReturnComponent } from './components/workspace/movements/add-movement/add-output/add-supplier-return/add-supplier-return.component';
import { AddOutputAdjustmentComponent } from './components/workspace/movements/add-movement/add-output/add-output-adjustment/add-output-adjustment.component';
import { AddProductionComponent } from './components/workspace/movements/add-movement/add-entry/add-production/add-production.component';
import { AcquisitionsComponent } from './components/workspace/movements/product/entries/acquisitions/acquisitions.component';
import { CustomerReturnsComponent } from './components/workspace/movements/product/entries/customer-returns/customer-returns.component';
import { EntryAdjustmentsComponent } from './components/workspace/movements/product/entries/entry-adjustments/entry-adjustments.component';
import { ProductionsComponent } from './components/workspace/movements/product/entries/productions/productions.component';
import { InternalConsumptionsComponent } from './components/workspace/movements/product/outputs/internal-consumptions/internal-consumptions.component';
import { OutputAdjustmentsComponent } from './components/workspace/movements/product/outputs/output-adjustments/output-adjustments.component';
import { SalesComponent } from './components/workspace/movements/product/outputs/sales/sales.component';
import { SupplierReturnsComponent } from './components/workspace/movements/product/outputs/supplier-returns/supplier-returns.component';
import { TransfersComponent } from './components/workspace/movements/product/transfers/transfers.component';
import { MovementsComponent } from './components/workspace/movements/product/movements/movements.component';
import { EntriesComponent } from './components/workspace/movements/product/entries/entries.component';
import { OutputsComponent } from './components/workspace/movements/product/outputs/outputs.component';
import { SubcategoryProductsComponent } from './components/workspace/categories/subcategory-products/subcategory-products.component';
import { CategoryProductsComponent } from './components/workspace/categories/category-products/category-products.component';
import { LocationProductsComponent } from './components/workspace/locations/location-products/location-products.component';
import { LocationMovementsComponent } from './components/workspace/locations/location-movements/location-movements.component';
import { SupplierMovementsComponent } from './components/workspace/suppliers/supplier-movements/supplier-movements.component';
import { CurrencyProductsComponent } from './components/workspace/currencies/currency-products/currency-products.component';
import { CurrencyMovementsComponent } from './components/workspace/currencies/currency-movements/currency-movements.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'signup', component: SignupComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'product/:productId',
        component: ProductComponent,
      },
      {
        path: 'product/:productId/:currencyId',
        component: ProductComponent,
      },
      {
        path: 'product/:productId/:productName/assign-subcategory',
        component: AssignCategoryComponent,
      },
      {
        path: 'product/:productId/:productName/assign-subcategory/:currentSubcategoryId',
        component: AssignCategoryComponent,
      },
      {
        path: 'product/:productId/:productName/assign-currency',
        component: AssignCurrencyComponent,
      },
      {
        path: 'product/:productId/:productName/assign-currency/:currentCurrencyId',
        component: AssignCurrencyComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/category/:categoryId/products',
        component: CategoryProductsComponent,
      },
      {
        path: 'categories/subcategory/:subcategoryId/products',
        component: SubcategoryProductsComponent,
      },
      {
        path: 'subcategory/category/change/:subcategoryId/:subcategoryName/:currentCategoryId',
        component: ChangeSubcategoryCategoryComponent,
      },
      {
        path: 'subcategory/category/change/:subcategoryId/:subcategoryName/:currentCategoryId',
        component: ChangeSubcategoryCategoryComponent,
      },
      {
        path: 'locations',
        component: LocationsComponent,
      },
      {
        path: 'locations/location/:locationId/products',
        component: LocationProductsComponent,
      },
      {
        path: 'locations/location/:locationId/:locationName/movements',
        component: LocationMovementsComponent,
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
      },
      {
        path: 'suppliers/products/:supplierId/:supplierName',
        component: ProductsManagementComponent,
      },
      {
        path: 'suppliers/movements/:supplierId/:supplierName',
        component: SupplierMovementsComponent,
      },
      {
        path: 'currencies',
        component: CurrenciesComponent,
      },
      {
        path: 'currencies/currency/:currencyId/:currencyName/products',
        component: CurrencyProductsComponent,
      },
      {
        path: 'currencies/currency/:currencyId/:currencyName/movements',
        component: CurrencyMovementsComponent,
      },
      {
        path: 'movement/add-acquisition/:productId/:productName',
        component: AddAcquisitionComponent,
      },
      {
        path: 'movement/add-production/:productId/:productName',
        component: AddProductionComponent,
      },
      {
        path: 'movement/add-customer-return/:productId/:productName',
        component: AddCustomerReturnComponent,
      },
      {
        path: 'movement/add-entry-adjustment/:productId/:productName',
        component: AddEntryAdjustmentComponent,
      },
      {
        path: 'movement/add-sale/:productId/:productName/:valid',
        component: AddSaleComponent,
      },
      {
        path: 'movement/add-internal-consumption/:productId/:productName',
        component: AddInternalConsumptionComponent,
      },
      {
        path: 'movement/add-supplier-return/:productId/:productName',
        component: AddSupplierReturnComponent,
      },
      {
        path: 'movement/add-output-adjustment/:productId/:productName',
        component: AddOutputAdjustmentComponent,
      },
      {
        path: 'movement/add-transfer/:productId/:productName',
        component: AddTransferComponent,
      },
      {
        path: 'movement/product/:productId/:productName',
        component: MovementsComponent,
      },
      {
        path: 'movement/product/entries/:productId/:productName',
        component: EntriesComponent,
      },
      {
        path: 'movement/product/outputs/:productId/:productName',
        component: OutputsComponent,
      },
      {
        path: 'movement/product/acquisitions/:productId/:productName',
        component: AcquisitionsComponent,
      },
      {
        path: 'movement/product/productions/:productId/:productName',
        component: ProductionsComponent,
      },
      {
        path: 'movement/product/customer-returns/:productId/:productName',
        component: CustomerReturnsComponent,
      },
      {
        path: 'movement/product/entry-adjustments/:productId/:productName',
        component: EntryAdjustmentsComponent,
      },
      {
        path: 'movement/product/sales/:productId/:productName/:valid',
        component: SalesComponent,
      },
      {
        path: 'movement/product/internal-consumptions/:productId/:productName',
        component: InternalConsumptionsComponent,
      },
      {
        path: 'movement/product/supplier-returns/:productId/:productName',
        component: SupplierReturnsComponent,
      },
      {
        path: 'movement/product/output-adjustments/:productId/:productName',
        component: OutputAdjustmentsComponent,
      },
      {
        path: 'movement/product/transfers/:productId/:productName',
        component: TransfersComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/workspace', pathMatch: 'full' },
];
