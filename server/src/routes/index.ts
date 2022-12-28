import { Router } from "express";
const router = Router();

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getChat,
  sendMessage,
  test,
} from "../controllers/index.controller";

router.get("/test", test)
router.post("/message", sendMessage);
router.post("/chat", getChat);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/registration", createUser);
router.post("/login", loginUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
