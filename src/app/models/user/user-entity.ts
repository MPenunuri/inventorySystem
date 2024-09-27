import { UserI } from './user';

export interface UserEntityI extends UserI {
  id: number;
  roles: string;
}

export class UserEntity implements UserEntityI {
  private _id: number;
  private _username: string;
  private _email: string;
  private _password: string;
  private _roles: string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    roles: string
  ) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
    this._roles = roles;
  }

  get id() {
    return this._id;
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

  get roles() {
    return this._roles;
  }

  toObject() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      password: this._password,
      roles: this._roles,
    };
  }
}
