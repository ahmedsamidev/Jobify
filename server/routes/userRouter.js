import { Router } from "express";
import {
  getApplicationStatus,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import {
  authroizedPermissons,
  validateUpdateUserInput,
} from "../middleware/validationMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authroizedPermissons("admin"),
  getApplicationStatus,
]);
router.patch(
  "/update-user",
  checkTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
