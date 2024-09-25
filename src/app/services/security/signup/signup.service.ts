import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserI } from '../../../models/user/user';
import { UserEntityI } from '../../../models/user/user-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private user?: UserI;

  constructor(private http: HttpClient) {}

  setUser(username: string, email: string, password: string) {
    this.user = new User(username, email, password);
  }

  signUp(): Observable<UserEntityI> {
    if (this.user === undefined) {
      throw new Error('Undefined user data');
    }
    return this.http.post<UserEntityI>('/api/auth/signup', this.user);
  }
}
