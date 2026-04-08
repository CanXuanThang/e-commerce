import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_SECRET_KEY!;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET_KEY!;

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: any) => {
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });
};
