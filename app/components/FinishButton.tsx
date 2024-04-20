import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaStop } from "react-icons/fa6";

export function FinishButton() {
  return (
    <Button>
      <Flex>
        <FaStop size={30} />
        終了
      </Flex>
    </Button>
  );
}
