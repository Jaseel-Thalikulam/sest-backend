import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
const mongoose = require('mongoose');
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
 
    public async changeUserAccess(id: ObjectId) {
        try {

            const userId = new mongoose.Types.ObjectId(id);
            let userData = await this.userModel.findById(userId)

            if (userData) {


                userData.isBanned = !userData.isBanned;

                return await userData.save();
            } else {
                return false
            }


        } catch (err) {
            console.log(err, "from DB Gatway");

        }

    }

    public async isSuperAdmin(id: ObjectId) {
        try {
            let data = await this.userModel.findById(id)

            return data.role == "SuperAdmin" ? true : false

        } catch (err) {
            console.log(err);

        }
    }

    public async addexpiryOTP(id: Object,OTP:number) {
        
        const StringifiedId = id.toString()
       
        const filter = { _id: StringifiedId };
        const otpExpiryDate = Date.now() + 30000;

    
        const update = {
          $set: {
            'otp.code': OTP,    
            'otp.expiresAt': otpExpiryDate
          }
        };

        const updatedUser = await this.userModel.findByIdAndUpdate(filter, update, {
            
            projection: {
              otp: 1
            }
          });
        
        
        
    }


    public async getUserData(id: string) {

        return  await this.userModel.findById(id)
     
    }

    public async SetAsVerified(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        
        user.isVerified = true;

        user.otp = undefined;

       
       return await user.save();
    }

    public async removeUser(id:string) {
        console.log(id," from db handlerrrr");
        
        const result = await this.userModel.deleteOne({ _id: id })
        
        console.log(result ,"helooooo ");
        
    }


    public async findUserData(data) {
        
        
        return await this.userModel.findOne({ email: data.email });
         
    }

    public async findUserByEmail(data) {
        console.log(data, "from db handler change password");
        return this.userModel.findOne({email:data.email})
        
    }

    public async UpdatePassword(userDetails:LoginDto) {
        const userData =await this.userModel.findOne({ email: userDetails.email })
        
        userData.password = userDetails.password

        return userData.save()
    }


}
