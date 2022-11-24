import { DateSplitter } from "./DateSplitter/DateSplitter";
import { MessageBlock } from "./MessageBlock/MessageBlock";
import styles from "./MessageContainer.module.css";

localStorage.setItem('account', 'pavel')

const today = new Date();

const someData = [
  {
    id: 1,
    hash: 123,
    sender: 'pavel',
    message: "жесть кж, хватит плакать.",
    date: new Date(Date.now() - 172800002172),
    seen: false,
  },
  {
    id: 2,
    hash: 2134,
    sender: 'kj',
    message: "ок, не буду.",
    date: new Date(Date.now() - 172800002),
    seen: false,
  },
  {
    id: 3,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(Date.now() - 86400001),
    seen: false,
  },
  {
    id: 4,
    hash: 123123123,
    sender: 'kj',
    message: "ок, иду работать",
    date: new Date(Date.now() - 86400001),
    seen: false,
  },
  {
    id: 5,
    hash: 123123123,
    sender: 'pavel',
    message: "отлично.",
    date: new Date(Date.now() - 86400001),
    seen: false,
  },
  {
    id: 6,
    hash: 123123123,
    sender: 'pavel',
    message: "так, ты всё?",
    date: new Date(),
    seen: false,
  },
  {
    id: 7,
    hash: 123123123,
    sender: 'kj',
    message: "не",
    date: new Date(),
    seen: false,
  },
];

console.log(someData);

export const MessageContainer = () => {
  return (
    <div className={styles.msg_container}>
      {someData.map((e) =>
        e.date.valueOf() < today.valueOf() ? (
          <div className={styles.pd10}>
            <DateSplitter date={e.date} />
            <MessageBlock message={e.message} sender={e.sender} date={e.date} seen={e.seen}/>
          </div>
        ) : (
          <MessageBlock message={e.message} sender={e.sender} date={e.date} seen={e.seen}/>
        )
      )}
    </div>
  );
};
