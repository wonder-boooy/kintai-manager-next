"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

function StartButton() {
  return <button>開始</button>;
}

function BreakButton() {
  return <button>休憩</button>;
}

function FinishButton() {
  return <button>終了</button>;
}

function CurrentTime() {
  const [time, setTime] = useState<null | string>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());

    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 100);

    // コンポーネントのアンマウント時にタイマーをクリア
    return () => clearInterval(timerId);
  }, []);

  // 時刻がnullの場合はローディング状態を表示。これによりHydration errorを回避している。
  // ref: https://nextjs.org/docs/messages/react-hydration-error
  if (!time) return <div>Loading...</div>;

  return <time>{time}</time>;
}

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>
        <CurrentTime />
        <StartButton />
        <BreakButton />
        <FinishButton />
      </h1>
    </main>
  );
}
