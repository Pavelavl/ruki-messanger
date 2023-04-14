const initialState = {
  items: [],
  currentDialogId: window.location.pathname.split("dialog/")[1],
  isLoading: false,
};

export const dialogs = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "DIALOGS:SET_ITEMS":
      return {
        ...state,
        items: payload,
      };
    case "DIALOGS:LAST_MESSAGE_READED_STATUS":
      return {
        ...state,
        items: state.items.map((dialog: any) => {
          if (dialog.id === payload.dialogId) {
            dialog.lastMessage.readed = true;
          }
          return dialog;
        }),
      };
    case "DIALOGS:SET_CURRENT_DIALOG_ID":
      return {
        ...state,
        currentDialogId: payload,
      };
    default:
      return state;
  }
};
