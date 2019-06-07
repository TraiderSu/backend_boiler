import { errorService } from './errorService';

class JoiValidationError extends Error {
  constructor(err) {
    super();
    this.status = 400;
    this.name = 'Bad request, invalid input parameters';
    this.isOperational = true;
    this.message = err.details.map(item => item.message.replace(/"/g, ''));
  }
}

export { errorService, JoiValidationError };
