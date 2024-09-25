import { UserCredentialsI } from './user-credentials';

export interface UserI extends UserCredentialsI {
  username: string;
}

export class User implements UserI {
  private _username: string;
  private _email: string;
  private _password: string;

  constructor(username: string, email: string, password: string) {
    this._username = username;
    this._email = email;
    this._password = password;
  }

  get username() {
    return this._username;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }
}
