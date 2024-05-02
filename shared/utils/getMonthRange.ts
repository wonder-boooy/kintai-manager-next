import { getFirstDayOfMonth } from "./getFirstDayOfMonth";
import { getLastDayOfMonth } from "./getLastDayOfMonth";

export function getMonthRange(date: Date) {
  const dates = [];
  const start = getFirstDayOfMonth(date);
  const end = getLastDayOfMonth(date);

  let currentDate = start;

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
