import { axios } from "../../core";

export const messagesApi = {
  getAllByDialogId: (id: number) => axios.get("/messages?dialog=" + id),
  removeById: (id: number) => axios.delete("/messages?id=" + id),
  send: (text: string, dialogId: string, attachments: any) =>
    axios.post("/messages", {
      text: text,
      dialog_id: dialogId,
      attachments,
    }),
};
