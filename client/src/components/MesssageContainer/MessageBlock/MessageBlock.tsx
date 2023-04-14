import { IUser } from "../../../models/IUser";
import styles from "./MessageBlock.module.css";
import jwtDecode from "jwt-decode";

export const MessageBlock = ({chat} : any) => {
  const account: IUser = jwtDecode(localStorage.getItem('token')!);
  const message = [styles.message, chat.id_sender === account.id ? styles.back_client : styles.back_buddy].join(" ");
  const flow = [styles.flow, chat.id_sender === account.id && styles.position_client].join(" ");

  return (
    <div className={flow}>
      <div className={message}>
        <div className={styles.body}>
          <span className={styles.text}>{chat.message}</span>
        </div>
        <div className={styles.msgtime}>
          <div
            className={styles.time}
          >{`${new Date(chat.date).getHours()}:${new Date(chat.date).getMinutes().toString().length === 1 ? '0' + new Date(chat.date).getMinutes().toString() : new Date(chat.date).getMinutes()}`}</div>
          <div className={chat.seen ? styles.read : styles.unread}></div>
        </div>
      </div>
    </div>
  );
};
