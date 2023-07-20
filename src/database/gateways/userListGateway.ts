import { DataBase } from '../database.handler'
import { IUserListGateway } from '../../Domain/admin/interfaces/getAllUsers.interface';
import { Injectable } from '@nestjs/common';


@Injectable()
export class userListGateway implements IUserListGateway {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }

    async getAllUsers() {
     
        return this.dataBase.getAllUsers();
        
    }

    

  
}
