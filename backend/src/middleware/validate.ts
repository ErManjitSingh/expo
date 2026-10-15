import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError';

export function validate(schema: ZodType, source: 'body' | 'query' | 'params' = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
      return next(
        new ApiError(400, 'Validation failed', parsed.error.flatten()),
      );
    }
    req[source] = parsed.data as typeof req[typeof source];
    next();
  };
}
