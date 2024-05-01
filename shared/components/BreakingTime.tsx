import { useEffect, useState } from "react";
import { useWork } from "../hooks/useWork";
import { useBreak } from "../hooks/useBreak";
import { getTimes } from "../utils/getTimes";

const style: React.CSSProperties = {
  margin: "0 auto",
  color: "#fff",
  fontSize: 24,
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

export function BreakingTime() {
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1);
    return () => clearInterval(timerId);
  }, []);

  const [time, setTime] = useState<Date>(new Date());
  const { lastWork, stillWorking } = useWork();
  const { breakRecordList } = useBreak(lastWork);

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
