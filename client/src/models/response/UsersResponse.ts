import { ChatResponse } from "./ChatResponse";

export interface UsersResponse {
  id: number;
  username: string;
  password: string;
  description: string | null;
  name: string | null;
  surname: string | null;
  mail: string;
  lastVisit: string | null;
  chat: ChatResponse[];
}
