"use client";

import Container from "@/shared/components/Container";
import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";
import Buttons from "./components/Buttons";

export default function Home() {
  return (
    <main>
      <Container>
        <CurrentTime />
        <Buttons>
          <StartButton />
          <BreakButton />
          <FinishButton />
        </Buttons>
      </Container>
    </main>
  );
}
