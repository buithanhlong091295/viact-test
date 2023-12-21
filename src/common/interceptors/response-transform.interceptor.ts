import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();

    const request = http.getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        if (
          Array.isArray(data) &&
          data.length === 2 &&
          typeof data[1] === 'number'
        ) {
          const { page: pageQuery, limit: limitQuery } = request.query;
          const page = pageQuery ? +pageQuery : 1;
          const limit = limitQuery ? +limitQuery : 10;
          const totalItems = data[1];
          const totalPages = Math.ceil(data[1] / +limit);

          return {
            data: data[0],
            pagination: {
              page,
              limit,
              totalItems,
              totalPages,
            },
          };
        }

        return {
          data,
        };
      }),
    );
  }
}
