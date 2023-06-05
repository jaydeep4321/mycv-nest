import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let info: any =
      exception instanceof HttpException ? exception.getResponse() : [];
    response.status(status).json({
      error: info.error,
      statusCode: info.statusCode,
      message: info.message,
      data: info.data ? info.data : [],
    });
  }
}
export class errorHandler {
  public sendError(error, msg?: string) {
    throw new HttpException({ message: msg, details: error }, HttpStatus.OK);
  }
}
