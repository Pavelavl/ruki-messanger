import express from "express";
import socket from "socket.io";
import { UserController, ChatController } from "../controllers";
import cors from "cors";

export const createRoutes = (app: express.Express, io: socket.Server) => {
  const usersController = new UserController(io);
  const chatsController = new ChatController(io);

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(express.json());

  app.post("/message", chatsController.sendMessage);
  app.post("/chat", chatsController.getChat);
  app.put("/chat", chatsController.updateReadStatus);

  app.get("/users", usersController.getUsers);
  app.get("/users/:id", usersController.getUserById);
  app.post("/registration", usersController.createUser);
  app.post("/login", usersController.loginUser);
  app.put("/users/:id", usersController.updateUser);
  app.delete("/users/:id", usersController.deleteUser);
};
