export function formatMsg(msg: string) {
  return msg.slice(0, 25) + "...";
}

export function formatDate(date: string) {
  if (!date) {
    return "";
  }
  const newDate = new Date(date);
  const today = new Date();
  const week = new Date(today.getDay() - 7);
  const month = new Date(today.getMonth() - 1);

  if (newDate < month) {
    return newDate.toLocaleDateString("RU-ru");
  }
  if (newDate < month && newDate > week) {
    const diff = today.getDay() / 7 - newDate.getDay() / 7;
    return `${diff} ${diff === 1 ? "week" : "weeks"} ago`;
  }
  if (newDate < week && newDate > today) {
    const diff = today.getDay() - newDate.getDay();
    return `${diff} ${diff === 1 ? "day" : "days"} ago`;
  }
  if (today.getHours() - newDate.getHours() >= 1) {
    const diff = today.getHours() - newDate.getHours();
    return `${diff} ${diff === 1 ? "hour" : "hours"} ago`;
  } else {
    const diff = today.getMinutes() - newDate.getMinutes();
    return `${diff} ${diff === 1 ? "minute" : "minutes"} ago`;
  }
}
