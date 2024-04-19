"use client";

import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";

export default function Home() {
  return (
    <main>
      <div className="container">
        <CurrentTime />
        <div className="buttons">
          <StartButton />
          <BreakButton />
          <FinishButton />
        </div>
      </div>
    </main>
  );
}
