import { dialogsApi } from "../../utils/api";
import { socket } from "../../core/socket";

export const dialogsActions = {
  setDialogs: (items: []) => ({
    type: "DIALOGS:SET_ITEMS",
    payload: items,
  }),
  updateReadedStatus: ({
    userId,
    dialogId,
  }: {
    userId: number;
    dialogId: number;
  }) => ({
    type: "DIALOGS:LAST_MESSAGE_READED_STATUS",
    payload: {
      userId,
      dialogId,
    },
  }),
  setCurrentDialogId:
    (id: number) => (dispatch: ({ type, payload }: any) => void) => {
      socket.emit("DIALOGS:JOIN", id);
      dispatch({
        type: "DIALOGS:SET_CURRENT_DIALOG_ID",
        payload: id,
      });
    },
  fetchDialogs: () => (dispatch: ({ type, payload }: any) => void) => {
    dialogsApi.getAll().then(({ data }: { data: [] }) => {
      dispatch(dialogsActions.setDialogs(data));
    });
  },
};
