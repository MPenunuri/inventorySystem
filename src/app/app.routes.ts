import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/workspace/products/products.component';

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
    ],
  },
  { path: '', redirectTo: '/workspace', pathMatch: 'full' },
  { path: '**', redirectTo: '/workspace', pathMatch: 'full' },
];
