export function getHumanYYYYMMDDHhMmSs(date: Date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function getHumanYYYYMMDD(date: Date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getHumanYYYYMM(date: Date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "2-digit",
  });
}

export function getHumanHhhMmSs(date: Date) {
  return date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}