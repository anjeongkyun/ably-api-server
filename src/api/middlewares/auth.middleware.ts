import { SECRET_KEY } from "@/api/config";
import { HttpException } from "@/domain-model/exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type DataStoredInToken = {
  id: string;
  email: string;
};

export interface RequestWithUser extends Request {
  user: DataStoredInToken;
}

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const Authorization = req.header("Authorization")?.split("Bearer ")[1];

    if (!Authorization) {
      return next(new HttpException(401, "NotAuthorizedException"));
    }
    const verificationResponse = (await verify(
      Authorization,
      SECRET_KEY
    )) as DataStoredInToken;

    if (verificationResponse) {
      req.user = verificationResponse;
      next();
    } else {
      next(new HttpException(401, "NotAuthorizedException"));
    }
  } catch (error) {
    console.error(error);
    next(new HttpException(401, "NotAuthorizedException"));
  }
};

export default authMiddleware;
