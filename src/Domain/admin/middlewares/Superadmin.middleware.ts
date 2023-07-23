import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { middlewareGateway } from '../../../database/gateways/middlewareGateway';
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY
@Injectable()
export class SuperAdminVerifyMiddleware implements NestMiddleware {
   private readonly _middlewareGateway: middlewareGateway;
   constructor(middlewareGateway: middlewareGateway) {
      this._middlewareGateway = middlewareGateway;
    }
   use(req: Request, res: Response, next: NextFunction) {
      console.log("heloooo SU ")
      const token = req.headers['token'];
      console.log(token,"from HeloSU");
      
      const decodedToken =  new Promise((resolve, reject) => {
         jwt.verify(token, SECRECT_KEY, (err, decoded) => {
           if (err) {
            res.json({success:false,message:"Authentication Failed"})
           } else {
             resolve(decoded);
             
              let authorized = this._middlewareGateway.isSuperAdmin(decoded.userId)
              if (authorized) {
                 
                 next();
              } else {
                 res.json({success:false,message:"Authorization Failed"})
              }
           }
         });
      });
      


   }
}