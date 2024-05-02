function getDateTimes(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JS では Date.prototype.getMonth() の返り値が 0 - 11 なので +1 する
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const millisecond = date.getMilliseconds();

  return {
    year,
    month,
    day,
    hour,
    minute,
    millisecond,
  };
}
