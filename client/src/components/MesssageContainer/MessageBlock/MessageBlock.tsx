import styles from "./MessageBlock.module.css";

export const MessageBlock = () => {
  return (
    <div className={styles.flow}>
      <div className={styles.message}>
        <div className={styles.body}>
          <span className={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt at
            ea eos? Qui, numquam eos! Explicabo, possimus? Consectetur, aperiam,
            autem nobis vitae repellendus incidunt, excepturi esse optio
            aspernatur quos odit.
          </span>
        </div>
        <div className={styles.msgtime}>
          <div className={styles.time}>19:23</div>
          <div className={styles.read}></div>
        </div>
      </div>
    </div>
  );
};
