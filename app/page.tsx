"use client";

import styles from "./page.module.css";
import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>
        <CurrentTime />
      </h1>
      <div style={{ position: "relative", display: "flex", columnGap: 50 }}>
        <StartButton />
        <BreakButton />
        <FinishButton />
      </div>
    </main>
  );
}
