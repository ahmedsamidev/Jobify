import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = StatusCodes.BAD_REQUEST;
  }
}

export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

export class UNAUTHORIZEDError extends Error {
  constructor(message) {
    super(message);
    this.name = "UNAUTHORIZEDError";
    this.status = StatusCodes.FORBIDDEN;
  }
}
