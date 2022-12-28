import { useContext, useState } from "react";
import styles from "./ChatBlock.module.css";
import { formatMsg } from "./utils";
import { ChatResponse, UsersResponse } from "../../models/response";
import { Context } from "../..";
import { UserService } from "../../services";
import { observer } from "mobx-react-lite";

export const ChatBlock = observer(({ user }: { user: UsersResponse }) => {
  const [active, setActive] = useState([styles.block]);
  const [chat, setChat] = useState<ChatResponse>();
  const { store } = useContext(Context);

  const getChat = async (id: number) => {
    try {
      const sortedIds = [store.user.id, id].sort((a, b) => a - b);
      console.log(store.user.id);
      
      const response = await UserService.fetchChat(sortedIds[0], sortedIds[1]);
      setChat(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={active.join(" ")}
      onClick={() => {
        setActive((prev) =>
          prev.length === 1 ? [...prev, styles.active] : [styles.block]
        );
        getChat(user.id);
        console.log(chat);
        
      }}
    >
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
});
