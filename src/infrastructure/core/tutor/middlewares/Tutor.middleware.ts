import { mongooseMiddlewareRepository } from '../../../database/repositories/middleware/mongooseMiddlewareRepository';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRECT_KEY = process.env.SECRECT_KEY;

@Injectable()
export class TutorVerifyMiddleware implements NestMiddleware {
  private readonly _MiddlewareRepository: mongooseMiddlewareRepository;
  constructor(middlewareRepository: mongooseMiddlewareRepository) {
    this._MiddlewareRepository = middlewareRepository;
  }
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];

    new Promise((resolve) => {
      jwt.verify(token, SECRECT_KEY, (err, decoded) => {
        if (err) {
          res.json({ success: false, message: 'Authentication Failed' });
        } else {
          resolve(decoded);

          const Isauthorized = this._MiddlewareRepository.isTutor(decoded.userId);

          if (Isauthorized) {
           
            next();
          } else {
            res.json({ success: false, message: 'Authorization Failed' });
          }
        }
      });
    });
  }
}
