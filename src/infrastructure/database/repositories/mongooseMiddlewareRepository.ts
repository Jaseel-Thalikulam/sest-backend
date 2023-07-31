import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import  User  from "src/Domain/entity/user.entity";
import MiddlewareRepository from "src/Domain/interfaces/middleware.repository";




export class mongooseMiddlewareRepository implements MiddlewareRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

     async isSuperAdmin(id: ObjectId) {
        try {
            let data = await this.userModel.findById(id)

            return data.role == "SuperAdmin" ? true : false

        } catch (err) {
            console.log(err);

        }
    }
    async isTutor(id: ObjectId) { 
        try {
            let data = await this.userModel.findById(id)

            return data.role == "Lead" ? true : false

        } catch (err) {
            console.log(err);

        }
    
    }

}