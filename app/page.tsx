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
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: -200, top: -70 }}>
          <StartButton />
        </div>
        <BreakButton />
        <div style={{ position: "absolute", right: -200, top: -70 }}>
          <FinishButton />
        </div>
      </div>
    </main>
  );
}
