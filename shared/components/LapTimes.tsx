import Container from "./Container";
import { Absolute } from "./Absolute";
import { WorkingTime } from "./WorkingTime";
import { BreakingTime } from "./BreakingTime";
import Flex from "./Flex";
import { useWork } from "../hooks/useWork";
import { useBreak } from "../hooks/useBreak";

function WorkLap({ stillBreaking = false }: { stillBreaking?: boolean }) {
  return (
    <span style={{ color: stillBreaking ? "#a1a1a1" : undefined }}>
      <Flex>
        <span style={{ transition: "color 0.3s ease" }}>実働</span>
        <WorkingTime />
      </Flex>
    </span>
  );
}

function BreakLap({ stillBreaking = true }: { stillBreaking?: boolean }) {
  return (
    <span style={{ color: stillBreaking ? undefined : "#a1a1a1" }}>
      <Flex>
        <span style={{ transition: "color 0.3s ease" }}>休憩</span>
        <BreakingTime />
      </Flex>
    </span>
  );
}

export function LapTimes() {
  const { lastWork, stillWorking } = useWork();
  const { breakRecord, stillBreaking } = useBreak(lastWork);

  if (!stillWorking) return null;

  return (
    <Absolute top={25} left={25}>
      <Container>
        {stillWorking && <WorkLap stillBreaking={stillBreaking} />}
        {breakRecord && <BreakLap stillBreaking={stillBreaking} />}
      </Container>
    </Absolute>
  );
}
