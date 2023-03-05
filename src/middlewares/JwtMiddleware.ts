import { failure, success } from "../response";
import jwt from "jsonwebtoken";
import { NextFunction } from "express";

export const isAuthenticated = (req: any, res: any, next: NextFunction) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization) {
      return failure({
        res,
        status: 401,
        message: "🚫 Token missing or invalid 🚫",
      });
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
    if (decodedToken) {
      next();
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return failure({ res, status: 401, message: "🚫 Token Expired 🚫" });
    }
    return failure({
      res,
      status: 401,
      message: "🚫 Un-Authorized 🚫",
    });
  }
};
