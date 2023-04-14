import styles from "./Chat.module.css";
import { ChatBlock, MessageContainer } from "../../components";
import { lastVisit } from "./utils";
import React, { useEffect, useState } from "react";
import { socket } from "../../core/socket";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userActions } from "../../redux/actions";
import { userApi } from "../../utils/api";

export const Chat = () => {
  const [message, setMessage] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };
  const user: any = useSelector((state: any) => state.user);
  const store: any = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    userActions.fetchUsers();

    // socket.on("SERVER:DIALOG_CREATED", store.fetchDialogs);
    // socket.on("SERVER:NEW_MESSAGE", store.fetchDialogs);
    // socket.on("SERVER:MESSAGES_READED", store.updateReadedStatus);
    // return () => {
    //   socket.removeListener("SERVER:DIALOG_CREATED", store.fetchDialogs);
    //   socket.removeListener("SERVER:NEW_MESSAGE", store.fetchDialogs);
    // };
  }, []);

  console.log(user);

  // useEffect(() => {
  //   const { pathname } = location;
  //   const dialogId = pathname.split("/").pop();
  //   setDialog(dialogId);
  // }, [location.pathname]);

  return (
    <section className={styles.chat}>
      <div className={styles.leftpart}>
        <div className={styles.searchblock}>
          <div className={styles.btn_block}>
            <div className={styles.options} />
          </div>
          <div className={styles.string}>
            <div className={styles.loop_container}>
              <div className={styles.loop} />
            </div>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className={styles.chats}>
          {/* {user.users.map((item: any) => (
            <button
              className={styles.block}
              key={item.id}
              onClick={() => {
                store.setCurrentDialogId(item.id);
              }}
            >
              <ChatBlock user={item} />
            </button>
          ))} */}
        </div>
      </div>
      <div className={styles.rightpart}>
        <div className={styles.background}>
          <div className={styles.infobar}>
            <div className={styles.leftside}>
              <div className={[styles.btn_block, styles.invisible].join(" ")}>
                <div className={styles.back} />
              </div>
              <div className={[styles.avatar, styles.invisible].join(" ")} />
              <div className={styles.nameblock}>
                {/* {chat.length && <span className={styles.name}>{name}</span>} */}
                <span className={styles.last}>{lastVisit(new Date())}</span>
              </div>
            </div>
            <div className={styles.rightside}>
              <div className={styles.btn_block}>
                <div className={styles.loop} />
              </div>
              <div className={styles.btn_block}>
                <div className={styles.settings} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chatblock}>
          <div className={styles.overflow_y}>
            {/* <MessageContainer chat={chat} /> */}
          </div>
        </div>
        <form>
          <div className={styles.message_block}>
            <div className={styles.messagebar}>
              <input
                type="text"
                className={styles.message}
                placeholder="Message"
                onChange={onInputChange}
                required
              />
              <div className={styles.mic} />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};