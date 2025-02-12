import User from "../models/UserModal.js";
import Job from "../models/JobModal.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customeError.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) throw new NotFoundError("There is no user Found ");

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      user,
    },
  });
};

export const getApplicationStatus = async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({
    status: "success",
    data: {
      users,
      jobs,
    },
  });
};

export const updateUser = async (req, res, next) => {
  const { file } = req;
  const { name, email, lastName, location } = req.body;

  if (file) {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    req.user.avatar = response.secure_url;
    req.user.avatarPublicId = response.public_id;
  }

  const oldUser = await User.findByIdAndUpdate(req.user.id, {
    name,
    email,
    lastName,
    location,
    lastName,
    avatar: req.user.avatar,
    avatarPublicId: req.user.avatarPublicId,
  });

  if (file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({
    message: "User Updated",
  });
};
