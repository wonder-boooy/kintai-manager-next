import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaPlay } from "react-icons/fa6";
import { db } from "@/shared/utils/db";
import { useWork } from "@/shared/hooks/useWork";

export function StartButton() {
  const { stillWorking } = useWork();

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
