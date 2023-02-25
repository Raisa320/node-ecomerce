import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";
import jwt, { Secret } from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const foundUser = await prisma.customer.findFirst({
      where: {
        username: req.body.username,
      },
    });
    if (!foundUser) {
      return failure({ res, message: "Username is not correct" });
    }

    const isMatch = true; //bcrypt.compareSync(user.password, foundUser.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser.id?.toString(), username: foundUser.username },
        process.env.JWT_ACCESS_SECRET!,
        {
          expiresIn: "1h",
        }
      );

      return success({ res, data: { user: foundUser, token: token } });
    } else {
      return failure({ res, message: "Password is not correct" });
    }
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return success({ res, data: 123 });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
export const refreshToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return success({ res, data: 123 });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return success({ res, data: 123 });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};
