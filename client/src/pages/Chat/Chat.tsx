import styles from './Chat.module.css'
import { Message, DateSplitter, ChatBlock } from '../../components';

export const Chat = () => {
  return (
    <section>
      <div className={styles.leftpart}>
        <div className={styles.searchblock}>
          <div className={styles.options}></div>
          <div className={styles.string}>
            <div className={styles.loop}></div>
            <input type="text" placeholder='Search'/>
          </div>
        </div>
        <ChatBlock />
      </div>
      <div className={styles.rightpart}></div>
    </section>
  );
};
