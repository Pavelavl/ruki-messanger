const initialState: IState = {
  items: [],
  isLoading: false,
};

interface IState {
  items: any[];
  isLoading: boolean;
}

export const messages = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "MESSAGES:ADD_MESSAGE":
      return {
        ...state,
        items: [...state.items, payload],
      };
    case "MESSAGES:SET_ITEMS":
      return {
        ...state,
        items: payload,
        isLoading: false,
      };
    case "DIALOGS:LAST_MESSAGE_READED_STATUS":
      return {
        ...state,
        items: state.items.map((message) => {
          if (message.dialog._id === payload.dialogId) {
            message.readed = true;
          }
          return message;
        }),
      };
    case "MESSAGES:REMOVE_MESSAGE":
      return {
        ...state,
        items: state.items.filter((message) => message._id !== payload),
      };
    case "MESSAGES:SET_IS_LOADING":
      return {
        ...state,
        isLoading: payload,
      };
    default:
      return state;
  }
};
