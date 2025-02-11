import { Router } from "express";
import { login, logOut, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);

router.post("/login", validateLoginInput, login);
router.get("/logout", logOut);

export default router;
