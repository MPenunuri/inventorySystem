import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/security/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.checkAuthAndNavigate();
  const currentPath = route.routeConfig?.path;

  if (currentPath === 'login' || currentPath === 'signup') {
    if (isAuthenticated) {
      router.navigate(['/workspace']);
      return false;
    }
    return true;
  }

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
