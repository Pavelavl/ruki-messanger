import jwt, { VerifyErrors } from "jsonwebtoken";
import { IUser } from "../models/User";

export interface DecodedData {
  data: {
    _doc: IUser;
  };
}

export default (token: string): Promise<DecodedData | null> =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "",
      { algorithms: ["HS256"] },
      (err, decodedData) => {
        if (err || !decodedData) {
          reject(err);
        }
        resolve(decodedData as DecodedData);
      }
    );
  });
