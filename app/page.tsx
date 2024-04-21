"use client";

import Container from "@/shared/components/Container";
import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";
import Buttons from "./components/Buttons";

function Home() {
  return (
    <Container>
      <CurrentTime />
      <Buttons>
        <StartButton />
        <BreakButton />
        <FinishButton />
      </Buttons>
    </Container>
  );
}

export default Home;
