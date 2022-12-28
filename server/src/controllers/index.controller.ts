import { Request, Response } from "express";
import { pool } from "../database";
import { QueryResult } from "pg";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUser } from "../models/types";
import dotenv from "dotenv";

dotenv.config();

const hashCode = (str: string) => {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const test = async () => {
  const test = "20_24";
  console.log(hashCode(test));
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

export const getUserById = async (
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

const validateUserByEmail = async (email: string): Promise<boolean> => {
  const response: QueryResult = await pool.query(
    "SELECT * from users WHERE mail = $1",
    [email]
  );
  return response.rowCount > 0;
};

export const createUser = async (req: Request, res: Response) => {
  const { username, mail, password } = req.body;
  const candidate = await validateUserByEmail(mail);
  if (candidate) {
    return res.status(500).json("User with this email already exists.");
  }

  const hashPassword = await bcrypt.hash(password, 5);
  const response = await pool.query(
    "INSERT INTO users (username, mail, password) VALUES ($1, $2, $3)",
    [username, mail, hashPassword]
  );
  const usersId = await pool
    .query("SELECT * FROM users")
    .then((res) => res.rows.map((e) => e.id));

  for (let i = 0; i < usersId.length; i++) {
    const chatHash = hashCode(`${usersId[i]}_${usersId.at(-1)}`);
    await pool.query(
      `CREATE TABLE chat_${chatHash} (id SERIAL PRIMARY KEY, message TEXT NOT NULL, id_sender INTEGER NOT NULL, date TIMESTAMP NOT NULL)`
    );
  }

  res.status(200).json(generateToken(username, mail));
};

export const loginUser = async (req: Request, res: Response) => {
  const { mail, password } = req.body;
  const user: IUser = await pool
    .query("SELECT * FROM users WHERE mail = $1", [mail])
    .then((res) => res.rows[0]);

  const passwordEquals = await bcrypt.compare(password, user.password);
  if (user && passwordEquals) {
    return res.json(generateToken(user.username, user.mail));
  }
  throw new Error("Incorrect email or password.");
};

export const getChat = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id1, id2, id_sender, message } = req.body;
  try {
    const chatHash = hashCode(`${id1}_${id2}`);
    const response: QueryResult = await pool.query(
      `INSERT INTO chat_${chatHash} (id_sender, message, date) VALUES ($1, $2, $3)`,
      [id_sender, message, new Date().toLocaleString()]
    );
    return res.status(200).json("Message was sent successfully");
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal Server error");
  }
};

const generateToken = (username: string, mail: string) => {
  const payload = { mail: mail };
  const token = sign(payload, process.env.SECRET_KEY);
  return {
    message: "User logged/registered successfully",
    body: {
      accessToken: token,
      user: { username, mail },
    },
  };
};

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const response = await pool.query(
    "UPDATE users SET username = $1, mail = $2 WHERE id = $3",
    [name, email, id]
  );
  res.json("User Updated Successfully");
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM users where id = $1", [id]);
  res.json(`User ${id} deleted Successfully`);
};
