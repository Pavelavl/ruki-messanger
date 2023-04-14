import { notification } from "antd";

export const openNotification = function({
  text,
  type = "info",
  title,
  duration = 3,
}: {
  text: string;
  type: string;
  title: string;
  duration?: number;
}) {
  if (type === "success")
    return notification[type]({
      message: title,
      description: text,
      duration,
    });
  else if (type === "error")
    return notification[type]({
      message: title,
      description: text,
      duration,
    });
  else if (type === "info")
    return notification[type]({
      message: title,
      description: text,
      duration,
    });
}
