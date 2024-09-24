import { Injectable } from '@angular/core';
import {
  UserCredentials,
  UserCredentialsI,
} from '../../models/user/user-credentials';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  token?: string;

  private userCredentials?: UserCredentialsI;

  constructor(private http: HttpClient) {}

  setUserCredentials(email: string, password: string): void {
    this.userCredentials = new UserCredentials(email, password);
  }

  login(): void {
    if (this.userCredentials === undefined) {
      throw new Error('Undefined credentials');
    }

    this.http.post<string>('/api/auth/login', this.userCredentials).subscribe({
      next: (token) => {
        this.token = token;
        this.isAuthenticated = true;
      },
      error: () => {
        this.isAuthenticated = false;
      },
    });
  }
}
