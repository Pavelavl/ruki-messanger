import { Request, Response } from "express";
import socket from "socket.io";
import { hashCode } from "../utils/hasher";
import { QueryResult } from "pg";
import { pool } from "../core/database";

export class ChatController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  updateReadStatus = async (req: Request, res: Response) => {
    const { id1, id2, id_sender } = req.body;
    const chatHash = hashCode(`${id1}_${id2}`);
    try {
      await pool.query(`UPDATE chat_${chatHash} SET seen = true WHERE id_sender != ${id_sender}`);
      this.io.emit("SERVER:MESSAGES_READED");
      res.status(200).json("Messages readed successfully.");
    } catch (e) {
      res.status(500).json("Fail in reading messages.");
    }
  };

  getChat = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id1, id2 } = req.body;
      const chatHash = hashCode(`${id1}_${id2}`);
      const response: QueryResult = await pool.query(
        `SELECT * FROM chat_${chatHash}`
      );
      return res.status(200).json(response.rows);
    } catch (e) {
      console.log(e);
      return res.status(500).json("Internal Server error");
    }
  };

  sendMessage = async (req: Request, res: Response): Promise<Response> => {
    const { id1, id2, id_sender, message } = req.body;
    try {
      const chatHash = hashCode(`${id1}_${id2}`);
      const response: QueryResult = await pool.query(
        `INSERT INTO chat_${chatHash} (id_sender, message, date) VALUES ($1, $2, $3)`,
        [id_sender, message, new Date().toLocaleString()]
      );
      this.io.emit("SERVER:NEW_MESSAGE", message, id_sender);
      return res.status(200).json("Message was sent successfully");
    } catch (e) {
      console.log(e);
      return res.status(500).json("Internal Server error");
    }
  };
}
