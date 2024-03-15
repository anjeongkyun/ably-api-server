import { SECRET_KEY } from "@/api/config";
import jwt, { SignOptions } from "jsonwebtoken";

export const sign = (
  payload: string | Buffer | object,
  options: SignOptions
) => {
  return jwt.sign(payload, SECRET_KEY, options);
};

export const verify = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
