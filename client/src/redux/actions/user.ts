import { openNotification } from "../../utils/helpers";
import { userApi } from "../../utils/api";
import { IUser } from "../../models/IUser";

export const userActions = {
  setUserData: (data: any) => ({
    type: "USER:SET_DATA",
    payload: data,
  }),
  setUsers: (data: IUser[]) => ({
    type: "USERS:SET",
    payload: data,
  }),
  setIsAuth: (bool: boolean) => ({
    type: "USER:SET_IS_AUTH",
    payload: bool,
  }),
  fetchUsers: () => (dispatch: any) => {
    userApi
      .getUsers()
      .then(({ data }: any) => {
        dispatch(userActions.setUsers(data))
      })
      .catch((err) => {
        console.log(err);
      })
  },
  fetchUserData: () => (dispatch: any) => {
    userApi
      .getMe()
      .then(({ data }: any) => {
        dispatch(userActions.setUserData(data));
      })
      .catch((err: any) => {
        if (err.response.status === 403) {
          dispatch(userActions.setIsAuth(false));
          delete window.localStorage.token;
        }
      });
  },
  fetchUserLogin: (postData: any) => async (dispatch: any) => {
    try {
      const { data } = await userApi
        .signIn(postData);
      const { token } = data;
      openNotification({
        title: "Отлично!",
        text: "Авторизация успешна.",
        type: "success",
      });
      (window as any).axios.defaults.headers.common["token"] = token;
      window.localStorage["token"] = token;
      dispatch(userActions.fetchUserData());
      dispatch(userActions.setIsAuth(true));
      return data;
    } catch ({ response }) {
      openNotification({
        title: "Ошибка при авторизации",
        text: "Неверный логин или пароль",
        type: "error",
      });
    }
  },
  fetchUserRegister: (postData: any) => async (dispatch: any) => {
      const { data } = await userApi
          .signUp(postData);
      const { token } = data;
      (window as any).axios.defaults.headers.common["token"] = token;
      window.localStorage["token"] = token;
      dispatch(userActions.fetchUserData());
      dispatch(userActions.setIsAuth(true));
      return data;
  },
};
