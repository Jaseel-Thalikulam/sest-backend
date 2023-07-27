import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
import  User  from "src/Domain/entity/user.entity";
import AdminRepository from "src/Domain/interfaces/admin.repository";

export class mongooseAdminRepository implements AdminRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async changeUserAccess(id: string) {
        try {

            const userId = new mongoose.Types.ObjectId(id);
            let userData = await this.userModel.findById(userId)

            if (userData) {


                userData.isBanned = !userData.isBanned;

                return await userData.save()
            }else{
                return false
            }


        } catch (err) {
            console.log(err, "from DB Gatway");

            return false;
        }

    }


   async getAllUsers() {
        console.log("Finding UsersList")    
        return await this.userModel.find({});
    }


}