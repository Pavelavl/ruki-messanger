export function formatDate(date: Date): string {
  if (!date) return "";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let today = new Date()
    .toLocaleDateString("RU-ru")
    .split(".")
    .map((e) => parseInt(e));

  let day = date
    .toLocaleDateString("RU-ru")
    .split(".")
    .map((e) => parseInt(e));

  if (
    today[0] - day[0] === 0 &&
    today[1] - day[1] === 0 &&
    today[2] - day[2] === 0
  )
    return "Today";

  if (
    today[0] - day[0] === 1 &&
    today[1] - day[1] === 0 &&
    today[2] - day[2] === 0
  )
    return "Yesterday";

  if (today[2] - day[2] > 0) return date.toLocaleDateString();

  return `${months[date.getMonth()]} ${date.getDate()}`;
}
