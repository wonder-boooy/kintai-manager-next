import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaPause } from "react-icons/fa6";

export function BreakButton() {
  return (
    <Button>
      <Flex>
        <FaPause size={30} />
        休憩
      </Flex>
    </Button>
  );
}
