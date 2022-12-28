import { useState } from "react";
import { UsersResponse } from "../../models/response/UsersResponse";
import styles from "./ChatBlock.module.css";
import { formatMsg } from "./utils";



export const ChatBlock = ({ user }: { user: UsersResponse }) => {
  const [active, setActive] = useState([styles.block]);

  return (
    <div className={active.join(" ")} onClick={() => setActive(prev => prev.length == 1 ? [...prev, styles.active] : [styles.block])}>
      <div className={styles.block__inner}>
        <div className={styles.avatar}></div>
        <div className={styles.chatinfo}>
          <div className={styles.top}>
            <span className={styles.name}>
              {user.name ? user.name + " " + user.surname : user.username}
            </span>
            <span className={styles.lastmsgtime}>15:30</span>
          </div>
          <div className={styles.bottom}>
            <span className={styles.msg}>
              {formatMsg(
                "кж, когда ты уже доделаешь волгу. надоел уже жесть. осуждаем всей командой."
              )}
            </span>
            <div className={styles.unread}>1</div>
          </div>
        </div>
      </div>
    </div>
  );
};
