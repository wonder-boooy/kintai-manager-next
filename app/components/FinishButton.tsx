import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaStop } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

export function FinishButton() {
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];
  const stillWorking = !!lastWork && !lastWork.finishedAt;

  const finishWorking = () => {
    if (!lastWork) return;

    db.works.update(lastWork.id as number, {
      finishedAt: new Date(),
    });
  };

  return (
    <Button onClick={finishWorking} disabled={!stillWorking}>
      <Flex>
        <FaStop size={30} />
        終了
      </Flex>
    </Button>
  );
}
