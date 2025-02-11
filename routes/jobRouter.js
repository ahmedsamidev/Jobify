import { Router } from "express";
const router = Router();
import {
  deleteJob,
  getAllJobs,
  getJob,
  postNewJob,
  showStats,
  updateJob,
} from "../controllers/jobController.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
import { checkTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, postNewJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkTestUser, validateIdParam, validateJobInput, updateJob)
  .delete(checkTestUser, validateIdParam, deleteJob);

export default router;
