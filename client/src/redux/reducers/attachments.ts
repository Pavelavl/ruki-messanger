const initialState: IState = {
  items: [],
};

interface IState {
  items: any[];
}

export const attachments = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "ATTACHMENTS:SET_ITEMS":
      return {
        ...state,
        items: payload,
      };
    case "ATTACHMENTS:REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.uid !== payload.uid),
      };
    default:
      return state;
  }
};
