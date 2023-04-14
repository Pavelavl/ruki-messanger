import { Request, Response } from "express";
import { pool } from "../core/database";
import { QueryResult } from "pg";
import generatePasswordHash from "../utils/generatePasswordHash";
import bcrypt from "bcrypt";
import { IUser } from "../models/types";
import dotenv from "dotenv";
import socket from "socket.io";
import { hashCode } from "../utils/hasher";
import createJWT from "../utils/createJWT";

dotenv.config();

export class UserController {
  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const response: QueryResult = await pool.query("SELECT * FROM users");
      res.json(response.rows);
    } catch (e) {
      console.log(e);
      res.status(500).json("Internal Server error");
    }
  };

  getUserById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return res.json(response.rows);
  };

  validateUserByEmail = async (email: string): Promise<boolean> => {
    const response: QueryResult = await pool.query(
      "SELECT * from users WHERE mail = $1",
      [email]
    );
    return response.rowCount > 0;
  };

  createUser = async (req: Request, res: Response) => {
    const { username, mail, password } = req.body;
    const candidate = await this.validateUserByEmail(mail);
    if (candidate) {
      return res.status(500).json("User with this email already exists.");
    }

    const hashPassword = await generatePasswordHash(password);
    await pool.query(
      "INSERT INTO users (username, mail, password) VALUES ($1, $2, $3)",
      [username, mail, hashPassword]
    );
    // const usersId = await pool
    //   .query("SELECT * FROM users")
    //   .then((res) => res.rows.map((e) => e.id));

    // for (let i = 0; i < usersId.length; i++) {
    //   const chatHash = hashCode(`${usersId[i]}_${usersId.at(-1)}`);
    //   await pool.query(
    //     `CREATE TABLE chat_${chatHash} (id SERIAL PRIMARY KEY, message TEXT NOT NULL, id_sender INTEGER NOT NULL, seen BOOLEAN DEFAULT false, date TIMESTAMP NOT NULL)`
    //   );
    // }

    res.status(200).json({ token: createJWT({email: mail, password: password}) });
  };

  loginUser = async (req: Request, res: Response) => {
    const { mail, password } = req.body;
    try {
      const user: IUser = await pool
        .query("SELECT * FROM users WHERE mail = $1", [mail])
        .then((res) => res.rows[0]);
      
      if (!user) {
        res.status(404).json({
          message: "User not found"
        })
      }
      
      if (bcrypt.compareSync(password, user.password)) {
        return res.json({ token: createJWT({email: user.mail, password: user.password}) });
      }
    } catch (e) {
      res.status(400).json({
        message: "Incorrect password or email"
      })
    }
  };

  // generateToken = (username: string, mail: string, id: number) => {
  //   const payload = { mail: mail, username: username, id: id };
  //   const token = sign(payload, process.env.SECRET_KEY);
  //   return {
  //     message: "User logged/registered successfully",
  //     body: {
  //       accessToken: token,
  //       user: { username, mail, id },
  //     },
  //   };
  // };

  updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response = await pool.query(
      "UPDATE users SET username = $1, mail = $2 WHERE id = $3",
      [name, email, id]
    );
    res.json("User Updated Successfully");
  };

  deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM users where id = $1", [id]);
    res.json(`User ${id} deleted Successfully`);
  };
}
