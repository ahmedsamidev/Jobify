import { Router } from "express";
import rateLimiter from "express-rate-limit";
import { login, logOut, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

const rateLimit = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: {
    message:
      "Too many requests. Please try again after 15 minutes to ensure system security.",
  },
});

router.post("/register", rateLimit, validateRegisterInput, register);
router.post("/login", rateLimit, validateLoginInput, login);
router.get("/logout", logOut);

export default router;
