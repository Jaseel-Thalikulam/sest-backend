import { DataBase } from '../database.handler'
import { ILoginGateway } from '../../interfaces/loginGateway.interface';
import { Injectable } from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { LoginDto } from '../../dto/login.dto';

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
