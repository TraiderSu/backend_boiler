import { errorService } from './errorService';

class AppError extends Error {
  constructor(err) {
    super(err);
    this.status = 500;
    this.name = 'Server error';
  }
}

class ValidationError extends AppError {
  constructor(err) {
    super(err);
    this.status = 400;
    this.name = 'Bad request, invalid input parameters';
    this.isOperational = true;

    if (err.details) {
      this.message = err.details.map(item => item.message.replace(/"/g, ''));
    }
  }
}

class UnauthorizedError extends AppError {
  constructor(err) {
    super(err);
    this.status = 401;
    this.name = 'UnauthorizedError';
    this.isOperational = true;
    this.message = 'Please log in';
  }
}

class ForbiddenError extends AppError {
  constructor(err) {
    super(err);
    this.status = 403;
    this.name = 'ForbiddenError';
    this.isOperational = true;
    this.message = 'Permission denied';
  }
}

class NotFoundError extends AppError {
  constructor(err) {
    super(err);
    this.status = 404;
    this.name = 'NotFoundError';
    this.isOperational = true;
    this.message = 'Not found';
  }
}

export { errorService, AppError, ValidationError, UnauthorizedError, ForbiddenError, NotFoundError };
