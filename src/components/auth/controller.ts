import type { Request, Response } from "express";
import prisma from "../../datasource";
import { failure, success } from "../../response";
import * as Customer from "../customer/controller";
import * as utilsToken from "../../utils/jwt";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { encriptPass } from "../../utils/bcrypt";
import { hashToken } from "../../utils/crypto";

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

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return failure({
        res,
        status: 403,
        message: "Invalid login credentials",
      });
    }
    const jti = uuidv4();
    const { accessToken, refreshToken } = utilsToken.generateTokens(
      foundUser,
      jti
    );
    await addRefreshTokenToWhiteList(jti, refreshToken, foundUser.id);

    return success({
      res,
      data: { user: foundUser, accessToken, refreshToken },
    });
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
    const foundUser = await Customer.findCustomerByUsername(username);
    if (foundUser) {
      return failure({
        res,
        status: 400,
        message: "Username already in use.",
      });
    }
    const newUser = await Customer.store(req, res);
    const jti = uuidv4();

    const { accessToken, refreshToken } = utilsToken.generateTokens(
      newUser,
      jti
    );
    await addRefreshTokenToWhiteList(jti, refreshToken, newUser.id);

    return success({ res, data: { user: newUser, accessToken, refreshToken } });
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
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return failure({
        res,
        status: 400,
        message: "Missing refresh token.",
      });
    }

    const decodedToken = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET!
    );

    const savedRefreshToken = await findRefreshToken(decodedToken);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      return failure({ res, status: 401, message: "🚫 Un-Authorized 🚫" });
    }

    const hashed_token = await hashToken(refresh_token);
    if (hashed_token !== savedRefreshToken.hashed_token) {
      return failure({ res, status: 401, message: "🚫 Un-Authorized 🚫" });
    }

    const foundUser = await Customer.findCustomerByToken(decodedToken);

    if (!foundUser) {
      return failure({ res, status: 401, message: "🚫 Un-Authorized 🚫" });
    }
    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();

    const { accessToken, refreshToken } = utilsToken.generateTokens(
      foundUser,
      jti
    );

    await addRefreshTokenToWhiteList(jti, refreshToken, foundUser.id);

    return success({
      res,
      data: { user: foundUser, accessToken, refreshToken },
    });
  } catch (error) {
    return failure({
      res,
      message: error,
    });
  }
};

export const revokeRefreshTokens = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { customer_id } = req.body;
    await revokeTokens(customer_id);
    return success({
      res,
      data: `Tokens revoked for user with id #${customer_id}`,
    });
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

const addRefreshTokenToWhiteList = (
  jti: any,
  refresh_Token: string,
  customer_id: any
) => {
  return prisma.refresh_token.create({
    data: {
      id: jti,
      hashed_token: hashToken(refresh_Token),
      customer_id,
    },
  });
};

const findRefreshToken = (refresh_token: any) => {
  return prisma.refresh_token.findFirst({ where: { id: refresh_token.jti } });
};

const deleteRefreshToken = (id: any) => {
  return prisma.refresh_token.update({
    where: { id },
    data: { revoked: true },
  });
};

const revokeTokens = (customer_id: any) => {
  return prisma.refresh_token.updateMany({
    where: { customer_id },
    data: { revoked: true },
  });
};
