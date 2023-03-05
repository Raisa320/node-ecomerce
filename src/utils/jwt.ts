import { Customer } from "@prisma/client";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "5m",
    }
  );
};
export const generateRefreshToken = (user: any, jti: any) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      jti: jti,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "8h",
    }
  );
};

export const generateTokens = (user: any, jti: any) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};
