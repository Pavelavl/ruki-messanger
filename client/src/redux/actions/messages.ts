import { messagesApi } from "../../utils/api";

export const messagesActions = {
  setMessages: (items: []) => ({
    type: "MESSAGES:SET_ITEMS",
    payload: items,
  }),
  addMessage: (message: any) => (dispatch: any, getState: any) => {
    const { dialogs } = getState();
    const { currentDialogId } = dialogs;

    if (currentDialogId === message.dialog._id) {
      dispatch({
        type: "MESSAGES:ADD_MESSAGE",
        payload: message,
      });
    }
  },
  fetchSendMessage:
    ({ text, dialogId, attachments }: any) =>
    (dispatch: any) => {
      return messagesApi.send(text, dialogId, attachments);
    },
  setIsLoading: (bool: boolean) => ({
    type: "MESSAGES:SET_IS_LOADING",
    payload: bool,
  }),
  removeMessageById: (id: number) => (dispatch: any) => {
    if (window.confirm("Вы действительно хотите удалить сообщение?")) {
      messagesApi
        .removeById(id)
        .then(({ data }: any) => {
          dispatch({
            type: "MESSAGES:REMOVE_MESSAGE",
            payload: id,
          });
        })
        .catch(() => {
          dispatch(messagesActions.setIsLoading(false));
        });
    }
  },
  fetchMessages: (dialogId: number) => (dispatch: any) => {
    dispatch(messagesActions.setIsLoading(true));
    messagesApi
      .getAllByDialogId(dialogId)
      .then(({ data }: any) => {
        dispatch(messagesActions.setMessages(data));
      })
      .catch(() => {
        dispatch(messagesActions.setIsLoading(false));
      });
  },
};
