import crypto from "crypto";

export const hashToken = (token: any) => {
  return crypto.createHash("sha512").update(token).digest("hex");
};
