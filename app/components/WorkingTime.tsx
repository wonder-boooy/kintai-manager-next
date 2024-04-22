import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

const localeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
} as const;

const style: React.CSSProperties = {
  color: "#fff",
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 30,
  transition: "color 0.3s ease",
};

export function WorkingTime() {
  const [time, setTime] = useState<null | string>(null);
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], localeOptions));

    const timerId = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], localeOptions));
    }, 10);

    return () => clearInterval(timerId);
  }, []);

  const workingTimeNumber =
    new Date().getTime() - (lastWork?.startedAt.getTime() as number);

  if (!lastWork) return null;
  if (lastWork.finishedAt) return null;

  const hour = Math.floor(workingTimeNumber / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((workingTimeNumber / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor((workingTimeNumber / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const millisecond = Math.floor(workingTimeNumber % 1000)
    .toString()
    .padStart(3, "0");

  return (
    <div style={style}>
      {hour}:{minute}:{second}:{millisecond}
    </div>
  );
}
