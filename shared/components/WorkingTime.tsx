import { useEffect, useState } from "react";
import { useWork } from "../hooks/useWork";
import { useBreak } from "../hooks/useBreak";
import { getTimes } from "../utils/getTimes";

const style: React.CSSProperties = {
  margin: "0 auto",
  fontSize: 24,
  fontWeight: "bold",
  transition: "color 0.3s ease",
};

export function WorkingTime() {
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1);
    return () => clearInterval(timerId);
  }, []);

  const [time, setTime] = useState<Date>(new Date());
  const { lastWork, stillWorking } = useWork();
  const { breakRecordList } = useBreak(lastWork);

  if (!lastWork) return null;
  if (!stillWorking) return null;

  const breakingMilliSeconds = breakRecordList?.reduce((acc, cur) => {
    const startedAt = cur.startedAt.getTime();
    const finishedAt = cur.finishedAt?.getTime() || time.getTime();
    return acc + (finishedAt - startedAt);
  }, 0);
  const now = time.getTime();
  const startedAt = lastWork.startedAt.getTime();
  const workingMilliSeconds = now - startedAt - (breakingMilliSeconds || 0);
  const { hour, minute, second, millisecond } = getTimes(workingMilliSeconds);

  return (
    <div style={style}>
      {hour}:{minute}:{second}
      <span style={{ color: "#a1a1a1" }}>:{millisecond}</span>
    </div>
  );
}
