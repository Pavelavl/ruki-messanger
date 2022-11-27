import { Request, Response } from "express";
import { QueryResult } from "pg";
import { emit } from "process";
import { pool } from "../database";

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * FROM users");
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

export const getUserbyId = async (
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

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password, mail } = req.body;
  const response: QueryResult = await pool.query(
    "INSERT INTO users (username, password, mail) VALUES ($1, $2)",
    [username, password, mail]
  );
  return res.json({
    message: "User created succesfully",
    body: {
      user: {
        username,
        password,
        mail,
      },
    },
  });
};

export const updateUserbyId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  const { username, description, name, surname } = req.body;
  await pool.query(
    "UPDATE users SET username = $1, description = $2, name = $3, surname = $4 WHERE id = $5",
    [username, description, name, surname, id]
  );
  return res.json(`User ${id} updated successfully`);
};

export const deleteUserbyId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return res.json(`User ${id} deleted successfully`);
};
