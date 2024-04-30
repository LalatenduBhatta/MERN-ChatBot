import { NextFunction, Request, Response } from "express";
import userModel from "../models/user_model.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllusers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await userModel.find();
    res.status(200).json({ message: "OK", users });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already registered");
    }
    const hashedPassword = await hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    //remove cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    //create token
    const token = createToken(user._id.toString(), user.email, "7d");

    //7 days time creation dynamicaly
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    //send cookie to browser as http only cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    res.status(201).json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(401).send("User not Registered");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect Password");
    }

    //remove cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    //create token
    const token = createToken(user._id.toString(), user.email, "7d");

    //7 days time creation dynamicaly
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    //send cookie to browser as http only cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "ERROR", cause: err.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user token verification
  try {
    const user = await userModel.findById({ _id: res.locals.jwtData.id });
    if (!user) {
      res.status(401).send("User not Registered OR Token Expired");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission is denied");
    }
    res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "ERROR", cause: err.message });
  }
};
