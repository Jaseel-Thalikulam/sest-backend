import ISuperAdminRepository from '../../../../Domain/interfaces/admin.interface';
import User from '../../../../Domain/entity/user.entity';
import mongoose, { Model } from 'mongoose';
export declare class mongooseSuperAdminRepository implements ISuperAdminRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    changeUserAccess(id: string): Promise<false | (mongoose.Document<unknown, {}, User> & User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>)>;
    getAllUsers(): Promise<(mongoose.Document<unknown, {}, User> & User & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>)[]>;
}
