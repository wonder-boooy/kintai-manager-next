import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

const style: React.CSSProperties = {
  margin: "0 auto",
  color: "#fff",
  fontSize: 24,
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

const getTimes = (workingMilliSeconds: number) => {
  const hour = Math.floor(workingMilliSeconds / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((workingMilliSeconds / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor((workingMilliSeconds / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const millisecond = Math.floor(workingMilliSeconds % 1000)
    .toString()
    .padStart(3, "0");

  return { hour, minute, second, millisecond };
};

export function WorkingTime() {
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1);
    return () => clearInterval(timerId);
  }, []);

  const [time, setTime] = useState<Date>(new Date());
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];
  const stillWorking = lastWork && !lastWork.finishedAt;

  if (!stillWorking) return null;

  const now = time.getTime();
  const startedAt = lastWork.startedAt.getTime();
  const workingMilliSeconds = now - startedAt;
  const { hour, minute, second, millisecond } = getTimes(workingMilliSeconds);

  return (
    <div style={style}>
      {hour}:{minute}:{second}
      <span style={{ color: "#a1a1a1" }}>:{millisecond}</span>
    </div>
  );
}
