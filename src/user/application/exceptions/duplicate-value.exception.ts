import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateValueException extends HttpException {
  constructor(message: string = 'Duplicate value error') {
    super(message, HttpStatus.CONFLICT);
    this.name = 'DuplicateValueException';
  }
}
