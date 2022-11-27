import { Router } from "express";
import { getUsers, getUserbyId, createUser, deleteUserbyId, updateUserbyId } from "../controllers/index.controller";
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserbyId);
router.post("/users", createUser);
router.put("/users/:id", updateUserbyId);
router.delete("/users/:id", deleteUserbyId);


export default router;
