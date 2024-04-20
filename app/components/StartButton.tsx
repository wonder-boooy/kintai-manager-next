import { Button } from "@/shared/components/Button";
import Flex from "@/shared/components/Flex";
import { FaPlay } from "react-icons/fa6";

export function StartButton() {
  return (
    <Button>
      <Flex>
        <FaPlay size={30} />
        開始
      </Flex>
    </Button>
  );
}
