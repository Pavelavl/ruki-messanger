import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { userActions } from "./redux/actions";

const root = createRoot(document.getElementById("root")!);

store.dispatch(userActions.fetchUserData());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
