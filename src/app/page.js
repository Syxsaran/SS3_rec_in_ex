import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <p className={styles.textgradient}>Welcome</p>
      <p className={styles.textgradient}>Record income and expenses</p>
    </div>
  );
}
