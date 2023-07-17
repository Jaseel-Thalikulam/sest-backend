import { DataBase } from './database.handler'
import { IUserGateway } from '../interfaces/gateway.interface';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserGateway implements IUserGateway {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }

    async create(newUser: RegisterDto): Promise<IUser> {
        return this.dataBase.createUser(newUser);
    }
}
