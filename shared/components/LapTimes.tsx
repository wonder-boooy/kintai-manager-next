import Container from "./Container";
import { Absolute } from "./Absolute";
import { WorkingTime } from "./WorkingTime";
import { BreakingTime } from "./BreakingTime";

export function LapTimes() {
  return (
    <Absolute top={25} left={25}>
      <Container>
        <WorkingTime />
        <BreakingTime />
      </Container>
    </Absolute>
  );
}
