import { mongooseMiddlewareRepository } from '../../../database/repositories/middleware/mongooseMiddlewareRepository';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class SuperAdminVerifyMiddleware implements NestMiddleware {
    private readonly _MiddlewareRepository;
    constructor(middlewareRepository: mongooseMiddlewareRepository);
    use(req: Request, res: Response, next: NextFunction): void;
}
