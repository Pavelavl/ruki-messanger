import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { UsersResponse } from "../models/response/UsersResponse";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { ChatResponse } from "../models/response/ChatResponse";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  users = [] as UsersResponse[];
  chat = [] as ChatResponse[];

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users: UsersResponse[]) {
    this.users = users;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setChat(chat: ChatResponse[]) {
    this.chat = chat;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(mail: string, password: string) {
    try {
      const response = await AuthService.login(mail, password);
      localStorage.setItem("token", response.data.body.accessToken);
      this.setAuth(true);
      this.setUser(response.data.body.user);
    } catch (e) {
      console.log("Login error:", e);
    }
  }

  async registration(username: string, mail: string, password: string) {
    try {
      const response = await AuthService.registration(mail, username, password);
      localStorage.setItem("token", response.data.body.accessToken);
      this.setAuth(true);
      this.setUser(response.data.body.user);
    } catch (e) {
      console.log("Reg error:", e);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log("Logout error:", e);
    }
  }

  async getUsers() {
    try {
      const response = await UserService.fetchUsers();
      this.setUsers(response.data);
    } catch (e) {
      console.log("Error while getting users: ", e);
    }
  }

  async getChat(id1: number, id2: number) {
    try {
      const response = await UserService.fetchChat(id1, id2);
      this.setChat(response.data);
    } catch (e) {
      console.log("Error while getting chat: ", e);
    }
  }

  async postMessage(
    id1: number,
    id2: number,
    id_sender: number,
    message: string
  ) {
    try {
      await UserService.sendMessage(id1, id2, id_sender, message);
    } catch (e) {
      console.log("Error while sending the message: ", e);
    }
  }
}
