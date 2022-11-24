import { formatDate } from "./utils";
import styles from "./DateSplitter.module.css";
const tempDate = new Date(Date.now() - 60000);

export const DateSplitter = ({ date }: { date: Date }) => {
  return (
    <div className={styles.container}>
      <div className={styles.splitter}>
        <span className={styles.body}>{formatDate(date)}</span>
      </div>
    </div>
  );
};
