class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  static create(message, statusCode) {
    return new this(message, statusCode);
  }
}

module.exports = ApiError;