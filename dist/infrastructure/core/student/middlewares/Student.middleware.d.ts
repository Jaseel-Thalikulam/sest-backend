import { mongooseMiddlewareRepository } from '../../../database/repositories/middleware/mongooseMiddlewareRepository';
import { NestMiddleware } from '@nestjs/common';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';
import { Request, Response, NextFunction } from 'express';
export declare class StudentVerifyMiddleware implements NestMiddleware {
    private readonly _MiddlewareRepository;
    private readonly _UserRepository;
    constructor(middlewareRepository: mongooseMiddlewareRepository, UserRepository: mongooseUserRepository);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
