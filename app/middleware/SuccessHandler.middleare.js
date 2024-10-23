function responseHandler(req, res, next) {
  res.success = (
    data,
    status = "OK",
    statusCode = 200,
    message = "Operation completed successfully",
    pagination = null
  ) => {
    const response = {
      code: statusCode,
      status: status,
      message: message,
      content: data,
      details: {
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
        requestId: req.headers["x-request-id"] || "unknown",
        documentationUrl: "https://api.example.com/docs/errors", // Customize this for your API
      },
    };

    if (pagination) {
      response.pagination = {
        totalItems: pagination.totalItems || 0,
        totalPages: pagination.totalPages || 0,
        currentPage: pagination.currentPage || 1,
        pageSize: pagination.pageSize || 10,
      };
    }

    return res.status(statusCode).json(response);
  };

  next();
}

export default responseHandler;
