import { DataBase } from '../database.handler'
import { IRegisterGateway } from '../../Domain/user/interfaces/registerGateway.interface';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from '../../Domain/user/dto/register.dto';
import { IUser } from '../../Domain/user/interfaces/user.interface';
import { LoginDto } from '../../Domain/user/dto/login.dto';
import { VerifyDto } from 'src/Domain/user/DTO/verifyotpdto';
import { log } from 'console';
import { ForgetPasswordDto } from 'src/Domain/user/DTO/forgetPassword.dto';
import { verifyOTPandUpdateDTO } from 'src/Domain/user/DTO/verifyOTPandUpdatePassword';

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
    async getUserData(data: VerifyDto): Promise<IUser>{
        console.log(data,"from gatewayyyy");
        
        return await this.dataBase.getUserData(data.userId )
    }
    async SetAsVerified(id:string): Promise<IUser> {
      return  this.dataBase.SetAsVerified(id)
    }

    async RemoveUser(id:string) {
        return this.dataBase.removeUser(id)
    }

    async findUser(data:ForgetPasswordDto){
         return this.dataBase.findUserData(data)
    }

    async findUserData(data: verifyOTPandUpdateDTO) {
        return this.dataBase.findUserByEmail(data)
    }

    async UpdatePassword(userDetails:LoginDto) {
        return this.dataBase.UpdatePassword(userDetails)
    }
}
