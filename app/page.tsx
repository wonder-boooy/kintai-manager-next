"use client";

import Container from "@/shared/components/Container";
import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";

export default function Home() {
  return (
    <main>
      <Container>
        <CurrentTime />
        <div className="buttons">
          <StartButton />
          <BreakButton />
          <FinishButton />
        </div>
      </Container>
    </main>
  );
}
