import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

const style: React.CSSProperties = {
  position: "absolute",
  top: 310,
  right: 0,
  left: 0,
  margin: "0 auto",
  color: "#fff",
  fontSize: 24,
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

const getTimes = (breakingMilliSeconds: number) => {
  const hour = Math.floor(breakingMilliSeconds / 1000 / 60 / 60)
    .toString()
    .padStart(2, "0");
  const minute = Math.floor((breakingMilliSeconds / 1000 / 60) % 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor((breakingMilliSeconds / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const millisecond = Math.floor(breakingMilliSeconds % 1000)
    .toString()
    .padStart(3, "0");

  return { hour, minute, second, millisecond };
};

export function BreakingTime() {
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1);
    return () => clearInterval(timerId);
  }, []);

  const [time, setTime] = useState<Date>(new Date());
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];
  const breakRecordList = useLiveQuery(
    () => db.breaks.where({ workId: lastWork?.id || 0 }).toArray(),
    [lastWork]
  );
  const stillWorking = lastWork && !lastWork.finishedAt;

  if (!stillWorking) return null;
  if (breakRecordList?.length === 0) return null;

  const now = time.getTime();
  const breakingMilliSeconds =
    breakRecordList?.reduce(
      (acc, cur) =>
        acc + (cur.finishedAt?.getTime() || now) - cur.startedAt.getTime(),
      0
    ) || 0;
  const { hour, minute, second, millisecond } = getTimes(breakingMilliSeconds);

  return (
    <div style={style}>
      {hour}:{minute}:{second}
      <span style={{ color: "#a1a1a1" }}>:{millisecond}</span>
    </div>
  );
}
