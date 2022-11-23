import styles from "./Chat.module.css";
import { Message, ChatBlock } from "../../components";

export const Chat = () => {
  return (
    <section className={styles.chat}>
      <div className={styles.leftpart}>
        <div className={styles.searchblock}>
          <div className={styles.options_block}>
            <div className={styles.options}></div>
          </div>
          <div className={styles.string}>
            <div className={styles.loop_block}>
              <div className={styles.loop}></div>
            </div>
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className={styles.chats}>
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
          <ChatBlock />
        </div>
      </div>
      <div className={styles.rightpart}>
        <div className={styles.infobar}>
          <div className={styles.leftside}>
            <div className={styles.back}></div>
            <div className={styles.avatar}></div>
            <div className={styles.nameblock}>
              <span className={styles.name}>Pavel</span>
              <span className={styles.last}>15:30</span>
            </div>
          </div>
          <div className={styles.rightside}>
            <div className={styles.loop}></div>
            <div className={styles.settings}></div>
          </div>
        </div>
        <div className={styles.chatblock}>
          <div className={styles.overflow_y}>
            <Message />
          </div>
        </div>
        <div className={styles.messagebar}>
          <input type="text" className={styles.message} />
          <div className={styles.mic}></div>
        </div>
      </div>
    </section>
  );
};
