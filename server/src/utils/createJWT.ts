import jwt from "jsonwebtoken";
import { reduce } from "lodash";
import dotenv from "dotenv";

interface ILoginData {
  email: string;
  password: string;
}

dotenv.config();

export default (user: ILoginData) => {
  const token = jwt.sign(
    {
      data: reduce(
        user,
        (result: any, value: string, key: string) => {
          if (key !== "password") {
            result[key] = value;
          }
          return result;
        },
        {}
      ),
    },
    process.env.SECRET_KEY || "",
    {
      expiresIn: process.env.JWT_MAX_AGE,
      algorithm: "HS256",
    }
  );

  return token;
};
