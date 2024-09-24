import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `https://inventory-system-production-6a39.up.railway.app${req.url}`,
  });

  return next(clonedRequest);
};
