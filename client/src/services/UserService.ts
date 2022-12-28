import $api from "../http";
import { AxiosResponse } from "axios";
import { UsersResponse } from "../models/response/UsersResponse";
import { ChatResponse } from "../models/response/ChatResponse";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<UsersResponse[]>> {
    return $api.get<UsersResponse[]>("/users");
  }

  static fetchChat(
    id1: number,
    id2: number
  ): Promise<AxiosResponse<ChatResponse[]>> {
    return $api.post<ChatResponse[]>("/chat", { id1, id2 });
  }

  static sendMessage(
    id1: number,
    id2: number,
    id_sender: number,
    message: string
  ): Promise<AxiosResponse<string>> {
    return $api.post<string>("/message", { id1, id2, id_sender, message });
  }
}
