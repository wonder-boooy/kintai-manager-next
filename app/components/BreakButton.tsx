import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaArrowRotateRight, FaPause } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useWork } from "@/shared/hooks/useWork";
import { useBreak } from "@/shared/hooks/useBreak";

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
  const { lastWork, stillWorking } = useWork();
  const { breakRecord, stillBreaking } = useBreak(lastWork);

  const toggleBreak = () => {
    if (!lastWork) return;
    if (!stillWorking) return;

    if (breakRecord && stillBreaking) {
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
