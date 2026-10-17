export function notFound(req, res) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  if (error.code === 11000) {
    return res.status(409).json({
      message: "A record with this unique value already exists"
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      message: "Invalid database identifier"
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Database validation failed"
    });
  }

  return res.status(500).json({
    message: "Internal server error"
  });
}