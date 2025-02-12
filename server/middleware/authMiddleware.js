import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customeError.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("invalid Auth");

  try {
    const { userId } = verifyToken(token);
    const testUser = userId === "67a65714becb520a1103d175";
    req.user = { id: userId, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid Auth");
  }
};

export const checkTestUser = (req, res, next) => {
  const { testUser } = req.user;
  if (testUser) throw new BadRequestError("Test User. Read Only!");
  next();
};
