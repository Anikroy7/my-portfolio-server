import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userId: number; email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};