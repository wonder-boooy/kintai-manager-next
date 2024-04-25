import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaArrowRotateRight, FaPause } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

function PauseButton() {
  return (
    <Flex>
      <FaPause size={30} />
      休憩
    </Flex>
  );
}

function RestartButton() {
  return (
    <Flex>
      <FaArrowRotateRight size={30} />
      再開
    </Flex>
  );
}

export function BreakButton() {
  const lastWork = useLiveQuery(async () => await db.works.toArray())?.slice(
    -1
  )[0];
  const breakRecord = useLiveQuery(
    () => db.breaks.where({ workId: lastWork?.id || 0 }).toArray(),
    [lastWork]
  )?.slice(-1)[0];
  const stillWorking = !!lastWork && !lastWork.finishedAt;
  const stillBreaking =
    stillWorking && !!breakRecord && !breakRecord.finishedAt;

  const toggleBreak = () => {
    if (!lastWork) return;

    if (stillBreaking) {
      db.breaks.update(breakRecord.id as number, {
        finishedAt: new Date(),
      });
      return;
    }

    db.breaks.add({
      startedAt: new Date(),
      workId: lastWork.id as number,
    });
  };

  return (
    <Button onClick={toggleBreak} disabled={!stillWorking}>
      {stillBreaking ? <RestartButton /> : <PauseButton />}
    </Button>
  );
}
