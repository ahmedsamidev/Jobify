import { StatusCodes } from "http-status-codes";
import User from "../models/UserModal.js";
import bcrypt from "bcryptjs";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import {
  NotFoundError,
  UnauthenticatedError,
  UNAUTHORIZEDError,
} from "../errors/customeError.js";
import { createToken } from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await User.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ status: "Success", message: "user Created" });
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, { password: 1, email: 1, id: 1 });

  const isValidUser =
    user &&
    (await comparePassword(password, user?.password)) &&
    user.email === email;

  if (!isValidUser) {
    return next(new UnauthenticatedError("Wrong Email or Password"));
  }

  const token = createToken({ userId: user.id });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "Successful Login" });
};

export const logOut = (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "Logged Out" });
};
