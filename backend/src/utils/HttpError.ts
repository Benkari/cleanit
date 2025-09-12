export class HttpError extends Error {
  constructor(message: string, public readonly status: number = 500) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ValidationError extends HttpError {
  constructor(message = "Invalid request") {
    super(message, 400);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden request") {
    super(message, 403);
  }
}
