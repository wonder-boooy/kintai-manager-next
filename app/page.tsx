"use client";

import Container from "@/shared/components/Container";
import { CurrentTime } from "./components/CurrentTime";
import { StartButton } from "./components/StartButton";
import { BreakButton } from "./components/BreakButton";
import { FinishButton } from "./components/FinishButton";
import Buttons from "./components/Buttons";
import { useEffect, useState } from "react";
import { Absolute } from "@/shared/components/Absolute";
import { ListLink } from "@/shared/components/ListLink";
import { LapTimes } from "@/shared/components/LapTimes";
import { useWork } from "@/shared/hooks/useWork";

// TODO: 背景色が変わるポイントを定義。秒になっているが分に変更する。
const checkPoints = [2, 4, 6, 8, 10];

function Home() {
  const [time, setTime] = useState(new Date());
  const { lastWork, stillWorking } = useWork();
  // TODO: 背景色変化の基準にする稼働時間。単位は分に変更する。
  const workingSeconds =
    lastWork && stillWorking
      ? (time.getTime() - lastWork.startedAt.getTime()) / 1000
      : 0;

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    const classList = bodyElement?.classList;

    if (!stillWorking) {
      classList?.remove(
        "working",
        "overwork-lv1",
        "overwork-lv2",
        "overwork-lv3",
        "overwork-lv4",
        "overwork-lv5"
      );
      return;
    }

    classList?.add("working");

    // NOTE: 労働時間によって背景色が変化するのは一旦なし
    // checkPoints.map((point, index) => {
    //   const levelClass = `overwork-lv${index + 1}`;
    //   workingSeconds > point
    //     ? classList?.add(levelClass)
    //     : classList?.remove(levelClass);
    // });
  }, [stillWorking, workingSeconds]);

  return (
    <>
      <Container>
        <CurrentTime />
        <Buttons>
          <StartButton />
          <BreakButton />
          <FinishButton />
        </Buttons>
      </Container>
      <LapTimes />
      <Absolute bottom={50}>
        <ListLink />
      </Absolute>
    </>
  );
}

export default Home;
