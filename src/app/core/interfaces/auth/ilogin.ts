import { IUser } from '../users/iuser';

export interface ILoginSendData {
  email: string;
  password: string;
}

export interface IloginResponse {
  message: string;
  data: IUser;
  token: string;
  refreshToken: string;
}
