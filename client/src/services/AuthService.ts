import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response";

export class AuthService {
  static async login(
    mail: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { mail, password });
  }

  static async registration(
    mail: string,
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", {
      username,
      mail,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }

}
