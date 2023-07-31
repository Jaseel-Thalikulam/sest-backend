import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { mongooseMiddlewareRepository } from 'src/infrastructure/database/repositories/mongooseMiddlewareRepository';
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY
@Injectable()
export class TutorVerifyMiddleware implements NestMiddleware {
   private readonly _MiddlewareRepository: mongooseMiddlewareRepository;
   constructor(middlewareRepository: mongooseMiddlewareRepository) {
      this._MiddlewareRepository = middlewareRepository;
    }
   use(req: Request, res: Response, next: NextFunction) {
 
       const token = req.headers['token'];
      
      const decodedToken =  new Promise((resolve, reject) => {
         jwt.verify(token, SECRECT_KEY, (err, decoded) => {
           if (err) {
            res.json({success:false,message:"Authentication Failed"})
         } else {
            resolve(decoded);
            
            let authorized =  this._MiddlewareRepository.isTutor(decoded.userId)
            
            if (authorized) {
             console.log("heloooo tutor auth completed ")
                 next();
            } else {
               
                 res.json({success:false,message:"Authorization Failed"})
              }
           }
         });
      });
 
   }
}