import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";
import * as Customer from "../customer/controller";
import * as utilsToken from "../../utils/jwt";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return failure({
        res,
        status: 400,
        message: "You must provide an username and a password.",
      });
    }
    const foundUser = await Customer.findCustomerByUsername(username);

    if (!foundUser) {
      return failure({
        res,
        status: 403,
        message: "Invalid login credentials.",
      });
    }

    const isMatch = true; //bcrypt.compareSync(foundUser.password, password);

    if (isMatch) {
      const token = utilsToken.generateAccessToken(foundUser);

      return success({ res, data: { user: foundUser, token: token } });
    } else {
      return failure({ res, status: 403, message: "Password is not correct" });
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
    const { username, password } = req.body;
    if (!username || !password) {
      return failure({
        res,
        status: 400,
        message: "You must provide an username and a password.",
      });
    }
    const foundUser = await prisma.customer.findFirst({
      where: {
        username,
      },
    });
    if (foundUser) {
      return failure({
        res,
        status: 400,
        message: "Username already in use.",
      });
    }
    const newUser = await Customer.store(req, res);

    const token = utilsToken.generateAccessToken(newUser);

    return success({ res, data: { user: newUser, token: token } });
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

export const addRefreshTokenToWhiteList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const refreshToken = await prisma.refresh_token.create({
      data: req.body,
    });
    return success({ res, data: refreshToken });
  } catch (error) {
    return failure({ res, message: error });
  }
};
