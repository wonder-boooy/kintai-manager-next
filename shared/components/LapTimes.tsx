import Container from "./Container";
import { Absolute } from "./Absolute";
import { WorkingTime } from "./WorkingTime";
import { BreakingTime } from "./BreakingTime";
import Flex from "./Flex";

export function LapTimes() {
  return (
    <Absolute top={25} left={25}>
      <Container>
        <Flex>
          実働
          <WorkingTime />
        </Flex>
        <Flex>
          休憩
          <BreakingTime />
        </Flex>
      </Container>
    </Absolute>
  );
}
