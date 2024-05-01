import Container from "./Container";
import { Absolute } from "./Absolute";
import { WorkingTime } from "./WorkingTime";
import { BreakingTime } from "./BreakingTime";
import Flex from "./Flex";
import { useWork } from "../hooks/useWork";
import { useBreak } from "../hooks/useBreak";

function WorkLap() {
  return (
    <Flex>
      実働
      <WorkingTime />
    </Flex>
  );
}

function BreakLap() {
  return (
    <Flex>
      休憩
      <BreakingTime />
    </Flex>
  );
}

export function LapTimes() {
  const { lastWork, stillWorking } = useWork();
  const { breakRecord, stillBreaking } = useBreak(lastWork);

  if (!stillWorking) return null;

  return (
    <Absolute top={25} left={25}>
      <Container>
        {stillWorking && <WorkLap />}
        {breakRecord && <BreakLap />}
      </Container>
    </Absolute>
  );
}
