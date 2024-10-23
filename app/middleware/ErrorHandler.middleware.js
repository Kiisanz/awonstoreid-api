function errorHandler(err, req, res, next) {
  const response = {
    status: err.statusCode || 500,
    error: err.name || "INTERNAL_SERVER_ERROR",
    message:
      Array.isArray(err.details) && err.details.length > 0
        ? err.details
        : [err.message],
    details: {
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      suggestion:
        err.suggestion || "Please verify the request parameters and try again.",
      requestId: req.headers["x-request-id"] || "unknown",
      documentationUrl: "https://api.example.com/docs/errors",
    },
  };

  return res.status(response.status).json(response);
}

export default errorHandler;
