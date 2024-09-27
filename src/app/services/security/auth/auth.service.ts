import { Injectable } from '@angular/core';
import { UserCredentials } from '../../../models/user/user-credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenValidation } from '../../../models/token-validation';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  token?: string;

  private userCredentials?: UserCredentials;

  constructor(private http: HttpClient) {}

  setUserCredentials(email: string, password: string): void {
    this.userCredentials = new UserCredentials(email, password);
  }

  login(): Observable<string> {
    if (this.userCredentials === undefined) {
      throw new Error('Undefined credentials');
    }

    return this.http
      .post<string>('/api/auth/login', this.userCredentials.toObject(), {
        responseType: 'text' as 'json',
      })
      .pipe(
        tap((token) => {
          localStorage.setItem('authToken', token);
          this.isAuthenticated = true;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticated = false;
  }

  validateToken(): Observable<TokenValidation> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<TokenValidation>('/api/secure/', { headers });
  }

  checkAuthAndNavigate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.isAuthenticated) {
        resolve(true);
        return;
      }
      const token = localStorage.getItem('authToken');
      if (token) {
        this.token = token;
        this.validateToken().subscribe({
          next: () => {
            this.isAuthenticated = true;
            resolve(true);
          },
          error: () => {
            this.token = undefined;
            this.isAuthenticated = false;
            localStorage.removeItem('authToken');
            resolve(false);
          },
        });
      } else {
        resolve(false);
      }
    });
  }
}
