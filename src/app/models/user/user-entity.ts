import { UserI } from './user';

export interface UserEntityI extends UserI {
  id: number;
  roles: string;
}
