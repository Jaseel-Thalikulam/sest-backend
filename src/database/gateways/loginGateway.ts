import { DataBase } from '../database.handler'
import { ILoginGateway, User } from '../../Domain/user/interfaces/loginGateway.interface';
import { Injectable } from '@nestjs/common';
import { IUser } from '../../Domain/user/interfaces/user.interface';
import { LoginDto } from '../../Domain/user/dto/login.dto';

@Injectable()
export class loginGateway implements ILoginGateway {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }
    

    async find(User: LoginDto): Promise<IUser>{
        return this.dataBase.findUser(User)
    }

   
}

