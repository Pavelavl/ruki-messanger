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
    sender: 'pavel',
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
    sender: 'pavel',
    message: "ок, иду работать",
    date: new Date(),
    seen: false,
  },
  {
    id: 5,
    hash: 123123123,
    sender: 'pavel',
    message: "отлично.",
    date: new Date(),
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
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 8,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 9,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 10,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 11,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 12,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 13,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 14,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 15,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 16,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
  {
    id: 17,
    hash: 123123123,
    sender: 'pavel',
    message: "ну всё, иди работай.",
    date: new Date(),
    seen: false,
  },
];

someData.sort((a, b) => b.id - a.id);

console.log(someData);

export const MessageContainer = () => {
  return (
    <div className={styles.msg_container}>
      {someData.map((e) =>
        e.date.valueOf() < today.valueOf() ? (
          <div className={styles.pd10}>
            <DateSplitter date={e.date} />
            <MessageBlock />
          </div>
        ) : (
          <MessageBlock />
        )
      )}
    </div>
  );
};
