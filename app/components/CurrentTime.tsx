import { useEffect, useState } from "react";
import localFont from "next/font/local";

const digital = localFont({ src: "../fonts/Let_s_go_Digital_Regular.ttf" });

const localeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as const;

const timeStyle: React.CSSProperties = {
  fontSize: "5rem",
  background: "#c1c1c1",
  height: "25rem",
  width: "25rem",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export function CurrentTime() {
  const [time, setTime] = useState<null | string>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], localeOptions));

    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], localeOptions));
    }, 100);

    // コンポーネントのアンマウント時にタイマーをクリア
    return () => clearInterval(timerId);
  }, []);

  // 時刻がnullの場合はローディング状態を表示。これによりHydration errorを回避している。
  // ref: https://nextjs.org/docs/messages/react-hydration-error
  if (!time)
    return (
      <div className={digital.className} style={timeStyle}>
        Loading...
      </div>
    );

  return (
    <div className={digital.className} style={timeStyle}>
      {time}
    </div>
  );
}
