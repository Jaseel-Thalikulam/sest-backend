import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, ObjectId } from "mongoose";
import User from "src/Domain/entity/user.entity";
import TutorRepository from "src/Domain/interfaces/tutor.repository";
import { TutorProfileDto } from "src/infrastructure/core/tutor/dto/tutorProfileDTO";
export class mongooseTutorRepository implements TutorRepository {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }


    async UpdateProfile(userdata: TutorProfileDto) {
        console.log(userdata, "from repository");

        try {

            const userDetails = await this.userModel.findById(userdata.userId);

            if (userDetails) {

                if (userdata.Number !== '') {

                    userDetails.phoneNumber = userdata.Number;
                }

                if (userdata.About !== '') {
                    userDetails.about = userdata.About;
                }

                if (userdata.DOB) {
                    userDetails.DOB = userdata.DOB;
                }

                if (userdata.githuburl) {


                    const update = {
                        $set: {
                            'URLs.github': userdata.githuburl,

                        }
                    };


                    const response = await this.userModel.findByIdAndUpdate(userdata.userId, update, {

                        projection: {
                            URLs: 1
                        }
                    });


                }

                if (userdata.linkedinurl) {
                    const update = {
                        $set: {
                            'URLs.linkedin': userdata.linkedinurl,

                        }
                    };


                    const response = await this.userModel.findByIdAndUpdate(userdata.userId, update, {

                        projection: {
                            URLs: 1
                        }
                    });
                }
                if (userdata.pinteresturl) {

                    const update = {
                        $set: {
                            'URLs.pinterest': userdata.pinteresturl,

                        }
                    };


                    const response = await this.userModel.findByIdAndUpdate(userdata.userId, update, {

                        projection: {
                            URLs: 1
                        }
                    });
                }

                const userData = await userDetails.save();
                return { success: true, message: "Successfully Updated!",userData };
            } else {
                return { success: false, message: "User not found" }
            }
        } catch (err) {

            return { success: false, message: "Server Error" }
        }
    }

}