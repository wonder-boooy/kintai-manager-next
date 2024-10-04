import { useEffect, useState } from "react";

const localeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as const;

const loadingStyle: React.CSSProperties = {
  color: "rgba(255, 255, 255, 0.2)",
  fontSize: 72,
  fontWeight: "bold",
  marginBottom: 30,
  transition: "color 0.3s ease",
};

const style: React.CSSProperties = {
  color: "#fff",
  fontSize: 72,
  fontWeight: "bold",
  marginBottom: 30,
  transition: "color 0.3s ease",
};

export function CurrentTime() {
  const [time, setTime] = useState<null | string>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], localeOptions));

    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], localeOptions));
    }, 100);

    return () => clearInterval(timerId);
  }, []);

  if (!time) return <div style={loadingStyle}>00:00:00</div>;

  return <div style={style}>{time}</div>;
}
