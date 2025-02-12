import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import moragan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
// custome imports
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorHandlerMiddleWare } from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();

if (process.env.NODE_ENV === "development") app.use(moragan("dev"));

const __filename = fileURLToPath(import.meta.url); // get the current module URL and convert it into a file path.
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Jobs Route
app.use("/api/v1/jobs", authenticateUser, jobRouter);
// auth Route
app.use("/api/v1/auth", authRouter);
// user Route
app.use("/api/v1/users", authenticateUser, userRouter);

// Test Route

app.use("/api/v1/test", (req, res, next) => {
  res.json({ message: "test" });
});

app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Not Found Handler
app.use("*", (req, res, next) => {
  res.status(404).json({ status: "Fail", message: "Not Found" });
});

// Error Handler
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 5100;
const dataBaseUrl = process.env.MONGO_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

try {
  await mongoose.connect(dataBaseUrl);
  app.listen(port, () => {
    console.log("Server is Runnig on Port..." + port);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
