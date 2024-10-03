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

export const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  {
    path: 'workspace',
    component: WorkspaceComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'products',
        component: ProductsComponent,
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
        path: 'subcategory/category/change/:subcategoryId/:subcategoryName/:currentCategoryId',
        component: ChangeSubcategoryCategoryComponent,
      },
      {
        path: 'locations',
        component: LocationsComponent,
      },
      {
        path: 'suppliers',
        component: SuppliersComponent,
      },
      {
        path: 'currencies',
        component: CurrenciesComponent,
      },
    ],
  },
  { path: '', redirectTo: '/workspace', pathMatch: 'full' },
  { path: '**', redirectTo: '/workspace', pathMatch: 'full' },
];
