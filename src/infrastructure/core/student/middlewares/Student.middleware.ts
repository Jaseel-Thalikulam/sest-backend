import { mongooseMiddlewareRepository } from '../../../database/repositories/middleware/mongooseMiddlewareRepository';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRECT_KEY = process.env.SECRECT_KEY;

@Injectable()
export class StudentVerifyMiddleware implements NestMiddleware {
  private readonly _MiddlewareRepository: mongooseMiddlewareRepository;
  private readonly _UserRepository: mongooseUserRepository;

  constructor(
    middlewareRepository: mongooseMiddlewareRepository,
    UserRepository: mongooseUserRepository,
  ) {
    this._MiddlewareRepository = middlewareRepository;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['token'];

    try {
      const decoded = jwt.verify(token, SECRECT_KEY);

      const isAuthorized = await this._MiddlewareRepository.isStudent(
        decoded.userId,
      );
      const isBanned = await this._MiddlewareRepository.isBanned(
        decoded.userId,
      );

      if (isAuthorized) {
        if (isBanned) {
          res.json({ success: false, message: 'You Have Been Banned' });
        } else {
          next();
        }
      } else {
        res.json({ success: false, message: 'Authorization Failed stud' });
      }
    } catch (err) {
      res.json({ success: false, message: 'Authentication Failed student' });
    }
  }
}
