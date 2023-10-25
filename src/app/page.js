import styles from "./page.module.css";

export default function Home() { // ประกาศคอมโพนเนนต์ Home
  return (
    <div className={styles.container}>
      <p className={styles.textgradient}>Welcome</p>
      <p className={styles.textgradient}>Record income and expenses</p>
    </div>
  );
}
