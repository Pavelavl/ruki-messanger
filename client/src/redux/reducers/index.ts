import { combineReducers } from "redux";
import { messages } from "./messages";
import { dialogs } from "./dialogs";
import { user } from "./user";
import { attachments } from "./attachments";

export default combineReducers({
  messages: messages,
  dialogs: dialogs,
  user: user,
  attachments: attachments,
});
