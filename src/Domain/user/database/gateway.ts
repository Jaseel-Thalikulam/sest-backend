import { DataBase } from './database.handler'
import { IUserGateway } from '../interfaces/gateway.interface';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { IUser } from '../interfaces/user.interface';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class UserGateway implements IUserGateway {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }

    async create(newUser: RegisterDto): Promise<IUser> {
        return this.dataBase.createUser(newUser);
    }
    async find(User: LoginDto): Promise<IUser>{
        return this.dataBase.findUser(User)
    }
}
