import { DateSplitter } from "./DateSplitter/DateSplitter";
import { MessageBlock } from "./MessageBlock/MessageBlock";
import styles from "./MessageContainer.module.css";

export const MessageContainer = ({ chat }: any) => {
  if (!chat.length) {
    return (
      <div>Here are no messages</div>
    )
  } 
  
  return (
    <div className={styles.msg_container}>
      {chat.map((e: any, i: any) =>
        new Date(e.date).valueOf() < new Date().valueOf() ? (
          <div className={styles.pd10} key={e.id}>
            <MessageBlock chat={e}/>
            {i !== chat.length &&
              new Date(chat[i].date).valueOf() - new Date(e.date).valueOf() >= 86400000 && (
                <DateSplitter date={new Date(chat[i].date)} />
              )}
          </div>
        ) : (
          <MessageBlock chat={e} />
        )
      )}
    </div>
  );
};
