import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Response, request, response } from 'express';

export class ResponseDto {
  sendSuccess(message: string, data: any, res: any): any {
    // console.log('function called!!', res);
    res.json({
      error: false,
      statusCode: HttpStatus.OK,
      message: message,
      data: data,
    });
    console.log('completed function');
  }

  sendCreated(message: string, data: any, res: any): any {
    res.json({
      error: false,
      statusCode: HttpStatus.CREATED,
      message: message,
      data: data,
    });
  }

  sendEmpty(message: string): any {
    console.log('function called!!', message);
    throw new HttpException(
      {
        error: true,
        statusCode: HttpStatus.NOT_FOUND,
        message: message,
        data: [],
      },
      HttpStatus.NOT_FOUND,
    );
    // new HttpException('send Null', HttpStatus.NOT_FOUND);
    // console.log('completed function');
  }

  sendBadRequest(message: string): any {
    console.log('called');
    throw new HttpException(
      {
        error: true,
        statusCode: HttpStatus.BAD_REQUEST,
        message: message,
        data: [],
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  sendUnAuthorised(message: string): any {
    console.log('called');
    throw new HttpException(
      {
        error: true,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: message,
        data: [],
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  sendForbidden(message: string): any {
    console.log('called');
    throw new HttpException(
      {
        error: true,
        statusCode: HttpStatus.FORBIDDEN,
        message: message,
        data: [],
      },
      HttpStatus.FORBIDDEN,
    );
  }

  sendInternalServerError(message: string): any {
    throw new HttpException(
      {
        error: true,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message,
        data: [],
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
