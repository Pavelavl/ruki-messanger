import styles from "./ChatBlock.module.css";
import { formatMsg } from './utils'

export const ChatBlock = () => {
  return (
    <div className={styles.block}>
      <div className={styles.block__inner}>
        <div className={styles.avatar}></div>
        <div className={styles.chatinfo}>
          <div className={styles.top}>
            <span className={styles.name}>PAVEL</span>
            <span className={styles.lastmsgtime}>15:30</span>
          </div>
          <div className={styles.bottom}>
            <span className={styles.msg}>{formatMsg('кж, когда ты уже доделаешь волгу. надоел уже жесть. осуждаем всей командой.')}</span>
            <div className={styles.unread}>1</div>
          </div>
        </div>
      </div>
    </div>
  );
};
