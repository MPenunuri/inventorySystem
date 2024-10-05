import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Unknown error';
      if (error.error instanceof ErrorEvent) {
        // Client side
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server side
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        if (
          error.error &&
          typeof error.error === 'object' &&
          error.error.error
        ) {
          errorMessage += `\nServer Message: ${error.error.error}`;
        }
      }

      console.error(errorMessage);
      return throwError(() => error);
    })
  );
}
