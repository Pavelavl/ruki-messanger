import { axios } from "../../core";

export const userApi = {
  signIn: (postData: any) => axios.post("/login", postData),
  signUp: (postData: any) => axios.post("/registration", postData),
  verifyHash: (hash: any) => axios.get("/user/verify?hash=" + hash),
  getMe: () => axios.get("/user/me"),
  findUsers: (query: any) => axios.get("/user/find?query=" + query),
  getUsers: () => axios.get("/users"),
};
