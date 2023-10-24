import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <p className={styles.centeredH}>Welcome</p>
      <p className={styles.centeredH}>Record income and expenses</p>
    </div>
  );
}
