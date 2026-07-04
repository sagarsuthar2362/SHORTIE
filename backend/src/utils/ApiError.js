class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    // Pass the message to the parent error class
    super(message);

    // attach the custom properties for API debugging
    this.statusCode = statusCode;
    ((this.success = false), (this.errors = errors));

    // capture the stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
