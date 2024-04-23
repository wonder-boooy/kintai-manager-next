import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

const style: React.CSSProperties = {
  position: "absolute",
  top: 270,
  right: 0,
  left: 0,
  margin: "0 auto",
  color: "#fff",
  fontSize: 24,
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

export function WorkingTime() {
  const [time, setTime] = useState<null | Date>(null);
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];

  useEffect(() => {
    setTime(new Date());

    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1);

    return () => clearInterval(timerId);
  }, []);

  if (!time) return null;
  if (!lastWork) return null;
  if (lastWork.finishedAt) return null;

  const now = time.getTime();
  const startedAt = lastWork.startedAt.getTime();
  const workingTimeNumber = now - startedAt;

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
      {hour}:{minute}:{second}
      <span style={{ color: "#a1a1a1" }}>:{millisecond}</span>
    </div>
  );
}
