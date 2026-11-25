class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddlerware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  const errorMessage = err.errors
    ? Object.values(err.errors).map((error) => error.message)
    : err.message;
  res.statusCode(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export { ApiError };
