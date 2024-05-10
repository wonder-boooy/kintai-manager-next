"use client";

import { db } from "@/shared/utils/db";
import { getFirstDayOfMonth } from "@/shared/utils/getFirstDayOfMonth";
import { getLastDayOfMonth } from "@/shared/utils/getLastDayOfMonth";
import { getMonthRange } from "@/shared/utils/getMonthRange";
import { getTimes } from "@/shared/utils/getTimes";
import { isValidDate } from "@/shared/utils/isValidDate";
import { useLiveQuery } from "dexie-react-hooks";
import { Input } from "./components/Input";
import { CenteredTh } from "./components/CenteredTh";
import {
  FaAngleLeft,
  FaAngleRight,
  FaArrowRotateRight,
  FaTrashCan,
} from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import Flex from "@/shared/components/Flex";
import Container from "@/shared/components/Container";
import { Margin } from "@/shared/components/Margin";
import { getHumanYYYYMM } from "@/shared/utils/getHumanDateTimes";
import Link from "next/link";

const regex = /^(19|20)\d{2}(0[1-9]|1[0-2])$/;

const buttonStyle = {
  color: "#fff",
  fontSize: 18,
  border: "none",
  background: "none",
  cursor: "pointer",
} as const;

type MonthRecordParams = {
  params: {
    yearMonth: string;
  };
};

// TODO: 祝日を扱えるJSライブラリを使って実装し直す
function Weekday({ date }: { date: Date }) {
  const weekday = date.toLocaleDateString([], { weekday: "short" });
  if (weekday === "土") {
    return (
      <span style={{ color: "blue" }}>
        {date.toLocaleDateString([], { day: "numeric" })}
        {`（${weekday}）`}
      </span>
    );
  }
  if (weekday === "日") {
    return (
      <span style={{ color: "red" }}>
        {date.toLocaleDateString([], { day: "numeric" })}
        {`（${weekday}）`}
      </span>
    );
  }
  return (
    <span>
      {date.toLocaleDateString([], { day: "numeric" })}
      {`（${weekday}）`}
    </span>
  );
}

function CurrentMonthTitle({ currentMonth }: { currentMonth: Date }) {
  return (
    <section style={{ textAlign: "center", fontSize: 30 }}>
      <h1>
        {currentMonth.toLocaleDateString([], {
          year: "numeric",
          month: "2-digit",
        })}
      </h1>
    </section>
  );
}

function PrevMonthButton({ currentMonth }: { currentMonth: Date }) {
  // currentMonthを直接操作するのではなく、新しいDateオブジェクトを作成し操作する
  const current = new Date(currentMonth);
  const prevMonth = new Date(current.setMonth(current.getMonth() - 1));
  const param = getHumanYYYYMM(prevMonth).replace("/", "");

  return (
    <Link href={`/lists/${param}`}>
      <button style={buttonStyle}>
        <Flex gap={5}>
          <FaAngleLeft size={20} />
          Prev
        </Flex>
      </button>
    </Link>
  );
}

function NextMonthButton({ currentMonth }: { currentMonth: Date }) {
  // currentMonthを直接操作するのではなく、新しいDateオブジェクトを作成し操作する
  const current = new Date(currentMonth);
  const nextMonth = new Date(current.setMonth(current.getMonth() + 1));
  const param = getHumanYYYYMM(nextMonth).replace("/", "");

  return (
    <Link href={`/lists/${param}`}>
      <button style={buttonStyle}>
        <Flex gap={5}>
          Next
          <FaAngleRight size={20} />
        </Flex>
      </button>
    </Link>
  );
}

function MonthRecord({ params }: MonthRecordParams) {
  const { yearMonth } = params;
  const currentMonth = new Date(
    [yearMonth.replace(/^(\d{4})(\d{2})$/, "$1/$2"), 1].join("/")
  );
  const start = getFirstDayOfMonth(currentMonth);
  const end = getLastDayOfMonth(currentMonth);

  const isValid = isValidDate(currentMonth);
  const worksQuery = () =>
    isValid
      ? db.works.where("startedAt").between(start, end, true, true).toArray()
      : db.works.where({ id: 0 }).toArray();
  const breaksQuery = () =>
    isValid
      ? db.breaks.toArray()
      : db.breaks.where({ id: 0 }).toArray();

  const works = useLiveQuery(worksQuery);
  const breakRecordList = useLiveQuery(breaksQuery);

  if (!regex.test(yearMonth)) return <div>Invalid date!</div>;
  if (!isValidDate(currentMonth)) return <div>Invalid date</div>;
  if (works === undefined) return <div>Loading...</div>;
  if (breakRecordList === undefined) return <div>Loading...</div>;

  const monthRange = getMonthRange(currentMonth);

  return (
    <Margin margin={50}>
      <Container>
        <Margin marginBottom={25}>
          <Flex align="baseline" gap={40}>
            <PrevMonthButton currentMonth={currentMonth} />
            <CurrentMonthTitle currentMonth={currentMonth} />
            <NextMonthButton currentMonth={currentMonth} />
          </Flex>
        </Margin>
        <table style={{ borderSpacing: "30px 10px" }}>
          <thead>
            <tr>
              <CenteredTh>日付</CenteredTh>
              <CenteredTh>勤務時間</CenteredTh>
              <CenteredTh>休憩時間</CenteredTh>
              <CenteredTh>実働時間</CenteredTh>
              <CenteredTh>備考</CenteredTh>
              <CenteredTh />
            </tr>
          </thead>
          <tbody>
            {monthRange.map((date) => {
              const worksOfMonth = works.filter(
                (work) => work.startedAt.getDate() === date.getDate()
              );
              const workMilliSeconds = worksOfMonth.reduce(
                (acc, cur) =>
                  acc +
                  (cur.finishedAt?.getTime() || new Date().getTime()) -
                  cur.startedAt.getTime(),
                0
              );
              const breaksOfMonth = breakRecordList.filter(
                (brk) => worksOfMonth.some((work) => work.id === brk.workId)
              );
              const breakMilliSeconds = breaksOfMonth.reduce(
                (acc, cur) =>
                  acc +
                  (cur.finishedAt?.getTime() || new Date().getTime()) -
                  cur.startedAt.getTime(),
                0
              );
              const realWorkMilliSeconds = workMilliSeconds - breakMilliSeconds;

              const { hour: workHour, minute: workMinute } =
                getTimes(workMilliSeconds);
              const { hour: breakHour, minute: breakMinute } =
                getTimes(breakMilliSeconds);
              const { hour: realHour, minute: realMinute } =
                getTimes(realWorkMilliSeconds);

              return (
                <tr key={date.getTime()}>
                  <td style={{ textAlign: "center" }}>
                    <Weekday date={date} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {workMilliSeconds === 0 ? (
                      <Input />
                    ) : (
                      <Input defaultValue={`${workHour}:${workMinute}`} />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {breakMilliSeconds === 0 ? (
                      <Input />
                    ) : (
                      <Input defaultValue={`${breakHour}:${breakMinute}`} />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {workMilliSeconds === 0 ? (
                      <Input readonly />
                    ) : (
                      <Input value={`${realHour}:${realMinute}`} readonly />
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <textarea rows={1} />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Flex gap={10}>
                      <FaArrowRotateRight size={20} />
                      <FaSave size={20} />
                      <FaTrashCan size={20} />
                    </Flex>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>
    </Margin>
  );
}

export default MonthRecord;
