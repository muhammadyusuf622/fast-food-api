import ErrorHandler from "../utils/ErrorHandler.js";

const errorMiddleware = (err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error!";

  console.error(`[ERROR] ${statusCode} - ${message}`);

  res.status(statusCode).json({
    status:"error",
    message: message,
  });
}

export default errorMiddleware;