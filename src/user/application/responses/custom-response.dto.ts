import { IsNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class CustomResponse<T> {
  @IsNotEmpty()
  @IsEnum(HttpStatus)
  status: HttpStatus;

  @IsOptional()
  data?: T;

  @IsOptional()
  @IsString()
  error?: string;

  @IsOptional()
  @IsString()
  message?: string;

  constructor(status: HttpStatus, data?: T, error?: string, message?: string) {
    this.status = status;
    this.data = data;
    this.error = error;
    this.message = message;
  }
}
