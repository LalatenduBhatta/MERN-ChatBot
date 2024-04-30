import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  // console.log(token);
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not Received" });
  }
  return new Promise<void>((resolved, rejected) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        rejected(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        // console.log("Token verification successful");
        resolved();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
