import { useLiveQuery } from "dexie-react-hooks";
import { Works, db } from "../utils/db";

export function useBreak(work: Works | undefined) {
  const stillWorking = !!work && !work.finishedAt;

  const breakRecord = useLiveQuery(
    () => db.breaks.where({ workId: work?.id || 0 }).toArray(),
    [work]
  )?.slice(-1)[0];

  const stillBreaking =
    stillWorking && !!breakRecord && !breakRecord.finishedAt;

  const breakRecordList = useLiveQuery(
    () => db.breaks.where({ workId: work?.id || 0 }).toArray(),
    [work]
  );

  const allBreakList = useLiveQuery(() => db.breaks.toArray());

  return {
    breakRecord,
    breakRecordList,
    allBreakList,
    stillBreaking,
  };
}
