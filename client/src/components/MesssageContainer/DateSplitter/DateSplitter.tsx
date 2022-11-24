import { formatDate } from "./utils";
import styles from "./DateSplitter.module.css";

export const DateSplitter = ({ date }: { date: Date }) => {
  return (
    <div className={styles.container}>
      <div className={styles.splitter}>
        <span className={styles.body}>{formatDate(date)}</span>
      </div>
    </div>
  );
};
