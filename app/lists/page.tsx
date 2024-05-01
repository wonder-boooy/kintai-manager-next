"use client";

import { Absolute } from "@/shared/components/Absolute";
import FlexColumn from "@/shared/components/FlexColumn";
import { TopPageLink } from "@/shared/components/TopPageLink";
import { ClearAllButton } from "@/shared/components/ClearAllButton";
import { useWork } from "@/shared/hooks/useWork";
import { useBreak } from "@/shared/hooks/useBreak";

const localeOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
} as const;

function List() {
  const { allWorkList } = useWork();
  const { allBreakList } = useBreak(undefined);

  return (
    <FlexColumn>
      <FlexColumn>
        <h1>Work List</h1>
        <ul>
          {allWorkList?.map((work) => (
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
          {allBreakList?.map((breakRecord) => (
            <li key={breakRecord.id}>
              {breakRecord.startedAt.toLocaleString([], localeOptions)} -{" "}
              {breakRecord.finishedAt?.toLocaleString([], localeOptions) ||
                "working"}
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
