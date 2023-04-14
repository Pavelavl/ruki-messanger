import { axios } from "../../core";

export const dialogsApi = {
  getAll: () => axios.get("/dialogs"),
  create: ({ partner, text }: any) => axios.post("/dialogs", { partner, text }),
};
