export function formatMsg(msg: string) {
  return msg.slice(0, 25) + "...";
}

export function formatDate(date: string) {
  if (!date) {
    return "";
  }

  const newDate = new Date(date);
  const today = new Date();
  const ticks = today.valueOf() - newDate.valueOf();
  const time = Math.abs(today.getTime() - newDate.getTime());

  if (ticks > 36e5 * 7 * 24 * 30) {
    return newDate.toLocaleDateString("RU-ru");
  }
  if (ticks > 36e5 * 24 * 7 && ticks <= 36e5 * 7 * 24 * 30) {
    const diff = Math.round(time / (36e5 * 24 * 7));
    return `${diff} ${diff === 1 ? "week" : "weeks"} ago`;
  }
  if (ticks >= 36e5 * 24 && ticks <= 36e5 * 7 * 24) {
    const diff = Math.round(time / (36e5 * 24));
    return `${diff} ${diff === 1 ? "day" : "days"} ago`;
  }
  if (ticks >= 36e5) {
    const diff = Math.round(time / 36e5);
    return `${diff} ${diff === 1 ? "hour" : "hours"} ago`;
  } else {
    const diff = today.getMinutes() - newDate.getMinutes();
    return `${diff} ${diff === 1 ? "minute" : "minutes"} ago`;
  }
}
