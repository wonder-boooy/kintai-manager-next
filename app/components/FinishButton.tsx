import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaStop } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useWork } from "@/shared/hooks/useWork";
import { useBreak } from "@/shared/hooks/useBreak";

export function FinishButton() {
  const { lastWork, stillWorking } = useWork();
  const { stillBreaking } = useBreak(lastWork);

  const finishWorking = () => {
    if (!lastWork) return;
    if (!stillWorking) return;
    if (stillBreaking) return;

    db.works.update(lastWork.id as number, {
      finishedAt: new Date(),
    });
  };

  return (
    <Button onClick={finishWorking} disabled={!stillWorking || stillBreaking}>
      <Flex>
        <FaStop size={30} />
        終了
      </Flex>
    </Button>
  );
}
