const initialState = {
  data: null,
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  users: [],
};

export const user = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case "USER:SET_DATA":
      return {
        ...state,
        data: payload,
        isAuth: true,
        token: window.localStorage.token,
      };
    case "USER:SET_IS_AUTH":
      return {
        ...state,
        isAuth: payload,
      };
    case "USERS:SET":
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
