"use client";

import Container from "@/shared/components/Container";
import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";
import Buttons from "./components/Buttons";
import { WorkingTime } from "./components/WorkingTime";
import FlexColumn from "@/shared/components/FlexColumn";

function Home() {
  return (
    <FlexColumn>
      <Container>
        <CurrentTime />
        <Buttons>
          <StartButton />
          <BreakButton />
          <FinishButton />
        </Buttons>
      </Container>
      <WorkingTime />
    </FlexColumn>
  );
}

export default Home;
