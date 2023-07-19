import { DataBase } from '../database.handler'
import { IRegisterGateway } from '../../Domain/user/interfaces/registerGateway.interface';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../../Domain/user/dto/register.dto';
import { IUser } from '../../Domain/user/interfaces/user.interface';
import { LoginDto } from '../../Domain/user/dto/login.dto';

@Injectable()
export class registerGateway implements IRegisterGateway {
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
