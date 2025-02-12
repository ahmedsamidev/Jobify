import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UNAUTHORIZEDError,
} from "../errors/customeError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModal.js";
import User from "../models/UserModal.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if (errorMessages[0].startsWith("No job"))
          return next(new NotFoundError(errorMessages));
        if (errorMessages[0].startsWith("you are not authrothized"))
          return next(new UNAUTHORIZEDError(errorMessages));
        return next(new BadRequestError(errorMessages));
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is Required"),
  body("position").notEmpty().withMessage("position is Required"),
  body("jobLocation").notEmpty().withMessage("job Location is Required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid Status Value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid Job Type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new BadRequestError("Invalid Maongo db Id");
    const job = await Job.findById(id);
    if (!job) throw new NotFoundError(`No job with this id ${id}`);

    const isOwner = req.user.id === job.createdBy.toString();
    if (!isOwner) {
      throw new Error(
        "you are not authorized to access or modify this job as you are not the owner"
      );
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name Required"),
  body("email")
    .notEmpty()
    .withMessage("email Required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new Error("Email Already Found");
    }),
  body("password")
    .notEmpty()
    .withMessage("password Required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location Required"),
  body("lastName").notEmpty().withMessage("last Name Required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email Required")
    .isEmail()
    .withMessage("Invalid Email Format"),
  body("password").notEmpty().withMessage("password Required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name Required"),
  body("email")
    .notEmpty()
    .withMessage("email Required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user.id.toString() !== req.user.id)
        throw new Error("Email Already Found");
    }),
  body("location").notEmpty().withMessage("location Required"),
  body("lastName").notEmpty().withMessage("last Name Required"),
]);

export const authroizedPermissons =
  (...rest) =>
  async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!rest.includes(user.role))
      throw new UNAUTHORIZEDError("You Are not Authorized to do this action");
    next();
  };
