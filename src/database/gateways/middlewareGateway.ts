import { DataBase } from '../database.handler'
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ISuperAdminMiddleware } from 'src/Domain/admin/interfaces/IsuperAdminMiddlewar.interface';


@Injectable()
export class middlewareGateway implements ISuperAdminMiddleware {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }

    async isSuperAdmin(id: ObjectId) {

        
        return await this.dataBase.isSuperAdmin(id)
    }

   
}
