import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaArrowRotateRight, FaPause } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useWork } from "@/shared/hooks/useWork";
import { useBreak } from "@/shared/hooks/useBreak";
import { useResponsive } from "@/shared/hooks/useResponsive";

function PauseButton() {
  const { isMobile } = useResponsive();

  return (
    <Flex>
      <FaPause size={30} />
      {isMobile || "休憩"}
    </Flex>
  );
}

function RestartButton() {
  const { isMobile } = useResponsive();

  return (
    <Flex>
      <FaArrowRotateRight size={30} />
      {isMobile || "再開"}
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
