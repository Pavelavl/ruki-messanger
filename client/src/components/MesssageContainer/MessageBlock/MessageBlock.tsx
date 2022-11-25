import styles from "./MessageBlock.module.css";
import { IMessageProps } from "./types";
const account = localStorage.getItem('account');

export const MessageBlock = (props: IMessageProps) => {
  const message = [styles.message, props.sender === account ? styles.back_client : styles.back_buddy].join(" ");
  const flow = [styles.flow, props.sender === account && styles.position_client].join(" ");

  return (
    <div className={flow}>
      <div className={message}>
        <div className={styles.body}>
          <span className={styles.text}>{props.message}</span>
        </div>
        <div className={styles.msgtime}>
          <div
            className={styles.time}
          >{`${props.date.getHours()}:${props.date.getMinutes().toString().length == 1 ? '0' + props.date.getMinutes().toString() : props.date.getMinutes()}`}</div>
          <div className={props.seen ? styles.read : styles.unread}></div>
        </div>
      </div>
    </div>
  );
};
