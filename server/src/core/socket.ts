import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

export const createSocket = (http: http.Server) => {
  const io = new Server(http, {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL
    },
  });

  io.on("connection", function (socket: any) {
    socket.on("DIALOGS:JOIN", (dialogId: string) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on("DIALOGS:TYPING", (obj: any) => {
      socket.broadcast.emit("DIALOGS:TYPING", obj);
    });
  });

  return io;
};
