import { NotFoundError } from "../errors/customeError.js";
import Job from "../models/JobModal.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllJobs = async (req, res, next) => {
  const { search, jobStatus, jobType, sort, page = 1, limit = 10 } = req.query;
  const queryObject = {
    createdBy: req.user.id,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const skip = (Number(page) - 1) * Number(limit);
  const sortKey = sortOptions[sort] || sortOptions.newest;
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / limit);
  res.status(200).json({
    status: "success",
    data: {
      totalJobs,
      numberOfPages,
      page: Number(page),
      jobs,
    },
  });
};

export const postNewJob = async (req, res, next) => {
  const { company, position } = req.body;
  const { id } = req.user;
  const job = await Job.create({ company, position, createdBy: id });

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Job added Sucessfully",
    data: {
      job,
    },
  });
};

export const getJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({
    status: "Success",
    data: {
      job,
    },
  });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "Success", message: "Job Modified", data: { job } });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  await Job.findByIdAndDelete(id);

  res.status(StatusCodes.NO_CONTENT).json({
    status: "Success",
    message: "Job Delete Successfully",
    data: null,
  });
};

export const showStats = async (req, res, next) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: { _id: "$jobStatus", count: { $sum: 1 } },
    },
  ]);

  const {
    declined = 0,
    pending = 0,
    interview = 0,
  } = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications.map((application) => {
    const {
      _id: { year, month },
      count,
    } = application;

    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY");

    return { date, count };
  });

  res.status(StatusCodes.OK).json({
    status: "Success",
    data: { stats: { pending, interview, declined }, monthlyApplications },
  });
};
