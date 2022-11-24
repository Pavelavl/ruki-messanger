import styles from "./Chat.module.css";
import { ChatBlock, MessageContainer } from "../../components";
import { lastVisit } from "./utils";

const date = new Date(Date.now() - 400000); // while production

export const Chat = () => {
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
          {/* filling the percentages of the typescript on the github. (while prod) */}
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
        <div className={styles.messagebar}>
          <input type="text" className={styles.message} />
          <div className={styles.mic} />
        </div>
      </div>
    </section>
  );
};
