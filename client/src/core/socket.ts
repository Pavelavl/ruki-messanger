import io from "socket.io-client";

export const socket = io(window.location.origin.replace("3000", "5000"), {
  withCredentials: true,
});
