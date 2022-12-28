import { IUser } from "../IUser";

export interface AuthResponse {
  message: string;
  body: {
    accessToken: string;
    user: IUser;
  };  
}
