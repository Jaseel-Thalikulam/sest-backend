import { DataBase } from '../database.handler'
import { IUserListGateway } from '../../Domain/admin/interfaces/getAllUsers.interface';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';


@Injectable()
export class userListGateway implements IUserListGateway {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }

    async getAllUsers() {
     
        return this.dataBase.getAllUsers();
        
    }

    async changeUserAccess(id: ObjectId) {
        try {
            return  this.dataBase.changeUserAccess(id)
        } catch (err) {
            console.log(err,'from userlist Gateway')
        }
    }

  
}
