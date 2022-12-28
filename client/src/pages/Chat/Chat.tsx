import styles from "./Chat.module.css";
import { ChatBlock, MessageContainer } from "../../components";
import { lastVisit } from "./utils";
import { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import UserService from "../../services/UserService";
import { UsersResponse } from "../../models/response/UsersResponse";
import { observer } from "mobx-react-lite";

const date = new Date(Date.now() - 400000); // while production

const Chat = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<UsersResponse[]>([]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

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
          {users.map((item) => (
            <ChatBlock user={item} key={item.id} />
          ))}
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
                <span className={styles.name}>Pavel</span>
                <span className={styles.last}>{lastVisit(date)}</span>
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
            <MessageContainer />
          </div>
        </div>
        <div className={styles.message_block}>
          <div className={styles.messagebar}>
            <input
              type="text"
              className={styles.message}
              placeholder="Message"
            />
            <div className={styles.mic} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(Chat);
