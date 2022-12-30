import { useState } from "react";
import styles from "./ChatBlock.module.css";
import { formatMsg } from "./utils";
import { UsersResponse } from "../../models/response";
import { formatDate } from "./utils";

export const ChatBlock = ({ user }: { user: UsersResponse }) => {
  const [active, setActive] = useState([styles.block]);

  return (
    <div
      className={active.join(" ")}
      onClick={() => {
        setActive((prev) =>
          prev.length === 1 ? [...prev, styles.active] : [styles.block]
        );
        
      }}
    >
      <div className={styles.block__inner}>
        <div className={styles.avatar}></div>
        <div className={styles.unread}>1</div>
        <div className={styles.chatinfo}>
          <div className={styles.top}>
            <span className={styles.name}>
              {user.name ? user.name + " " + user.surname : user.username}
            </span>
            <span className={styles.lastmsgtime}>{formatDate(user.chat[0] ? user.chat.at(-1)!.date : "")}</span>
          </div>
          <div className={styles.bottom}>
            <span className={styles.msg}>{formatMsg(user.chat[0] ? user.chat.at(-1)!.message : "")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
