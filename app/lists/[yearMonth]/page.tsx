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
import { FaArrowRotateRight, FaTrashCan } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import Flex from "@/shared/components/Flex";
import Container from "@/shared/components/Container";
import { Margin } from "@/shared/components/Margin";

const regex = /^(19|20)\d{2}(0[1-9]|1[0-2])$/;

type MonthRecordParams = {
  params: {
    yearMonth: string;
  };
};

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
      ? db.breaks.where("startedAt").between(start, end, true, true).toArray()
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
          <section style={{ textAlign: "center", fontSize: 30 }}>
            <h1>
              {currentMonth.toLocaleDateString([], {
                year: "numeric",
                month: "2-digit",
              })}
            </h1>
          </section>
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
                (brk) => brk.startedAt.getDate() === date.getDate()
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
                    {date.toLocaleDateString([], { day: "numeric" })}
                    {`（${date.toLocaleDateString([], { weekday: "short" })}）`}
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
                      <Input />
                    ) : (
                      <Input defaultValue={`${realHour}:${realMinute}`} />
                    )}
                  </td>
                  <td>
                    <textarea rows={1} />
                  </td>
                  <td>
                    <Flex gap={10}>
                      <FaArrowRotateRight size={20} />
                      <FaSave size={20} />
                      <FaTrashCan size={20} />
                    </Flex>
                  </td>
                </tr>
              );
            })}
            <tr></tr>
          </tbody>
        </table>
      </Container>
    </Margin>
  );
}

export default MonthRecord;
