export const errorHandlerMiddleWare = (err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || "Somthing Went Wrong";
  res.status(status).json({ status: "Fail", message });
};
