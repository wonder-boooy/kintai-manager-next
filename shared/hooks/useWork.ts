import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../utils/db";

export function useWork() {
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];
  const allWorkList = useLiveQuery(() => db.works.toArray());
  const stillWorking = !!lastWork && !lastWork.finishedAt;

  return {
    lastWork,
    allWorkList,
    stillWorking,
  }
}