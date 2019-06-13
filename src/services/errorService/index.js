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

export { errorService, AppError, ValidationError, UnauthorizedError };
