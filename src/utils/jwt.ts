import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
/*
export const generateAccessToken =async (user:User) => {
  const jwt_acc = process.env.JWT_ACCESS_SECRET;
  return jwt.sign({ }, jwt_acc, {
    expiresIn: "5m",
  });
}

function generateRefreshToken(user, jti) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "8h",
    }
  );
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
*/
