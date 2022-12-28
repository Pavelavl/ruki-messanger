export interface IUser {
  id: number;
  username: string;
  password: string;
  description: string | null;
  name: string | null;
  surname: string | null;
  mail: string;
  lastVisit: string | null;
}

export interface IChat {
  id: number;
  message: string;
  date: string;
}
