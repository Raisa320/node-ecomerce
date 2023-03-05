import bcrypt from "bcrypt";

export const encriptPass = (data: any) => {
  const hashedPassword = bcrypt.hash(data, 8);
  return hashedPassword;
};
