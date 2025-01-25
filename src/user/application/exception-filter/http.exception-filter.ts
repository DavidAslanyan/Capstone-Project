import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('Exception ', exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage =
      exception instanceof HttpException
        ? exception.getResponse() instanceof Object
          ? (exception.getResponse() as any).message || 'An error occurred'
          : exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      message: errorMessage,
    };

    response.status(status).json(errorResponse);
  }
}
