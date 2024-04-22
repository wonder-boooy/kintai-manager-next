import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaPlay } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

export function StartButton() {
  const lastWork = useLiveQuery(() => db.works.toArray())?.slice(-1)[0];
  const stillWorking = !!lastWork && !lastWork.finishedAt;

  const startWorking = () => {
    db.works.add({
      startedAt: new Date(),
    });
  };

  return (
    <Button onClick={startWorking} disabled={stillWorking}>
      <Flex>
        <FaPlay size={30} />
        開始
      </Flex>
    </Button>
  );
}
