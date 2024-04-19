import { useEffect, useState } from "react";

const localeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as const;

const loadingStyle: React.CSSProperties = {
  color: "#9f9f9f",
  fontSize: 72,
  fontWeight: "bold",
  marginBottom: 30,
  textShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  transition: "color 0.3s ease",
};

const style: React.CSSProperties = {
  color: "#fff",
  fontSize: 72,
  fontWeight: "bold",
  marginBottom: 30,
  textShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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

  if (!time) return <div style={loadingStyle}>Loading...</div>;

  return <div style={style}>{time}</div>;
}
