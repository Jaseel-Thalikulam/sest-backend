import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../Domain/user/interfaces/user.interface";
import { RegisterDto } from "../Domain/user/dto/register.dto";
import { IDatabaseGateway } from "../Domain/user/interfaces/database.interface";
import { LoginDto } from "../Domain/user/dto/login.dto";

export class DataBase implements IDatabaseGateway {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }

    public createUser(newUser: RegisterDto) {
        console.log("Account Created")
        const user = new this.userModel(newUser);
        return user.save();
    }
 
    public findUser(User: LoginDto) {
        console.log("Finding")

        return this.userModel.findOne({ email: User.email });
    }
    public getAllUsers() {
        console.log("Finding UsersList")

        return this.userModel.find({});
    }
}
