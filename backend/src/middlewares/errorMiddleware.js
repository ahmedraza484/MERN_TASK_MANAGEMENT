class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorMiddlerware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  const errorMessage = err.errors
    ? Object.values(err.errors).map((error) => error.message)
    : err.message;
  res.statusCode(statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export { ApiError, errorMiddlerware };
