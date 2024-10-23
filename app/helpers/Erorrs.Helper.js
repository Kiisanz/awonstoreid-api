class ValidationError extends Error {
  constructor(message, details = [], suggestion) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.details = details;
    this.suggestion = suggestion;
  }
}

class ResourceNotFoundError extends Error {
  constructor(
    message,
    details = [],
    suggestion = "Please check the request and try again."
  ) {
    super(message);
    this.name = "ResourceNotFoundError";
    this.statusCode = 404;
    this.details = details;
    this.suggestion = suggestion;
  }
}

class InternalServerError extends Error {
  constructor(
    message = "An unexpected error occurred.",
    details = [],
    suggestion
  ) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
    this.details = details;
    this.suggestion = suggestion;
  }
}

export { ValidationError, ResourceNotFoundError, InternalServerError };
