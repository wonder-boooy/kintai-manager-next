"use client";

import { db } from "@/shared/utils/db";
import { getFirstDayOfMonth } from "@/shared/utils/getFirstDayOfMonth";
import { getLastDayOfMonth } from "@/shared/utils/getLastDayOfMonth";
import { getMonthRange } from "@/shared/utils/getMonthRange";
import { getTimes } from "@/shared/utils/getTimes";
import { isValidDate } from "@/shared/utils/isValidDate";
import { useLiveQuery } from "dexie-react-hooks";

const regex = /^(19|20)\d{2}(0[1-9]|1[0-2])$/;

type InputProps = {
  type?: "text" | "number";
  width?: number;
  textAlign?: "left" | "center" | "right";
  value: string;
};

function Input({
  type = "text",
  width = 70,
  textAlign = "center",
  value,
}: InputProps) {
  return <input type={type} style={{ width, textAlign }} value={value} />;
}

type MonthRecordParams = {
  params: {
    yearMonth: string;
  };
};

function MonthRecord({ params }: MonthRecordParams) {
  const { yearMonth } = params;
  const currentMonth = new Date(yearMonth.replace(/^(\d{4})(\d{2})$/, "$1/$2"));
  const start = getFirstDayOfMonth(currentMonth);
  const end = getLastDayOfMonth(currentMonth);

  const isValid = isValidDate(currentMonth);
  const worksQuery = isValid
    ? () => db.works.where("startedAt").between(start, end, true, true).toArray()
    : () => db.works.where({ id: 0 }).toArray();
  const breaksQuery = isValid
    ? () => db.breaks.where("startedAt").between(start, end, true, true).toArray()
    : () => db.breaks.where({ id: 0 }).toArray();

  const works = useLiveQuery(worksQuery);
  const breakRecordList = useLiveQuery(breaksQuery);

  if (!regex.test(yearMonth)) return <div>Invalid date</div>;
  if (!isValidDate(currentMonth)) return <div>Invalid date</div>;
  if (works === undefined) return <div>Loading...</div>;
  if (works.length === 0) return <div>No data</div>;

  const monthRange = getMonthRange(currentMonth);

  return (
    <div>
      <table style={{ borderSpacing: "30px 10px" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>日付</th>
            <th style={{ textAlign: "center" }}>勤務時間</th>
            <th style={{ textAlign: "center" }}>休憩時間</th>
            <th style={{ textAlign: "center" }}>実働時間</th>
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
            const { hour: workHour, minute: workMinute } =
              getTimes(workMilliSeconds);
            const breaksOfMonth = breakRecordList?.filter(
              (brk) => brk.startedAt.getDate() === date.getDate()
            );
            const breakMilliSeconds = breaksOfMonth?.reduce(
              (acc, cur) =>
                acc +
                (cur.finishedAt?.getTime() || new Date().getTime()) -
                cur.startedAt.getTime(),
              0
            );
            const { hour: breakHour, minute: breakMinute } = getTimes(
              breakMilliSeconds || 0
            );
            const { hour: realHour, minute: realMinute } = getTimes(
              workMilliSeconds - (breakMilliSeconds || 0)
            );

            return (
              <tr key={date.getTime()}>
                <td style={{ textAlign: "center" }}>
                  {date.toLocaleDateString([], { day: "numeric" })}
                  {`（${date.toLocaleDateString([], { weekday: "short" })}）`}
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input value={`${workHour}:${workMinute}`} />
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input value={`${breakHour}:${breakMinute}`} />
                </td>
                <td style={{ textAlign: "center" }}>
                  <Input value={`${realHour}:${realMinute}`} />
                </td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

export default MonthRecord;
