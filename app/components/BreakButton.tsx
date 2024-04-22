import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaPause } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

export function BreakButton() {
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];
  const stillWorking = !!lastWork && !lastWork.finishedAt;

  const takeBreak = () => {
    if (!lastWork) return;

    db.breaks.add({
      startedAt: new Date(),
      workId: lastWork.id as number,
    });
  };

  return (
    <Button onClick={takeBreak} disabled={!stillWorking}>
      <Flex>
        <FaPause size={30} />
        休憩
      </Flex>
    </Button>
  );
}
