import { ChatResponse } from "../../models/response";
import { DateSplitter } from "./DateSplitter/DateSplitter";
import { MessageBlock } from "./MessageBlock/MessageBlock";
import styles from "./MessageContainer.module.css";

export const MessageContainer = ({ chat }: { chat: ChatResponse[] }) => {
  if (!chat.length) {
    return (
      <div>Here are no messages</div>
    )
  } 
  console.log(chat[0].seen);
  
  return (
    <div className={styles.msg_container}>
      {chat.map((e, i) =>
        new Date(e.date).valueOf() < new Date().valueOf() ? (
          <div className={styles.pd10} key={e.id}>
            <MessageBlock
              message={e.message}
              sender={e.id_sender}
              date={new Date(e.date)}
              seen={e.seen}
            />
            {i !== chat.length &&
              new Date(chat[i + 1].date).valueOf() - new Date(e.date).valueOf() >= 86400000 && (
                <DateSplitter date={new Date(chat[i + 1].date)} />
              )}
          </div>
        ) : (
          <MessageBlock
            message={e.message}
            sender={e.id_sender}
            date={new Date(e.date)}
            seen={e.seen}
          />
        )
      )}
    </div>
  );
};
