export function lastVisit(date: Date): string {
  let today = new Date();
  let now = today.getHours() * 60 + today.getMinutes();
  let time = date.getHours() * 60 + date.getMinutes();
  let diff = now - time;
  if (diff < 60) {
    return `был(а) ${diff} минут назад`;
  }
  if (diff < 1440) {
    return `был(а) ${Math.floor(diff / 60)} часов назад`;
  }
  return `был(а) ${Math.floor((diff / 60) / 24)} дней назад`;
}
