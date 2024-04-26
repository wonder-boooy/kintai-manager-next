"use client";

import { Absolute } from "@/shared/components/Absolute";
import FlexColumn from "@/shared/components/FlexColumn";
import { TopPageLink } from "@/shared/components/TopPageLink";
import { db } from "@/shared/utils/db";
import { useLiveQuery } from "dexie-react-hooks";
import { ClearAllButton } from "@/shared/components/ClearAllButton";

const localeOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as const;

function List() {
  const workList = useLiveQuery(() => db.works.toArray());
  const breakList = useLiveQuery(() => db.breaks.toArray());

  return (
    <FlexColumn>
      <FlexColumn>
        <h1>Work List</h1>
        <ul>
          {workList?.map((work) => (
            <li key={work.id}>
              {work.startedAt.toLocaleString([], localeOptions)} -{" "}
              {work.finishedAt?.toLocaleString([], localeOptions) || "working"}
            </li>
          ))}
        </ul>
      </FlexColumn>
      <FlexColumn>
        <h1>Break List</h1>
        <ul>
          {breakList?.map((br) => (
            <li key={br.id}>
              {br.startedAt.toLocaleString([], localeOptions)} -{" "}
              {br.finishedAt?.toLocaleString([], localeOptions) || "working"}
            </li>
          ))}
        </ul>
      </FlexColumn>
      <Absolute bottom={50}>
        <TopPageLink />
      </Absolute>
      <ClearAllButton />
    </FlexColumn>
  );
}

export default List;
