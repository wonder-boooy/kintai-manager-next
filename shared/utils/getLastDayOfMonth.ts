export function getLastDayOfMonth(date: Date) {
  // 翌月を指定して日付を0にすることで前月最終日を取得している
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
