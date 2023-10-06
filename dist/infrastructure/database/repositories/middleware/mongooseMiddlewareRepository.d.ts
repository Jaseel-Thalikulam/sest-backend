import IMiddlewareRepository from '../../../../Domain/interfaces/middleware.interface';
import User from '../../../../Domain/entity/user.entity';
import { Model, ObjectId } from 'mongoose';
export declare class mongooseMiddlewareRepository implements IMiddlewareRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    isSuperAdmin(id: ObjectId): Promise<boolean>;
    isTutor(id: ObjectId): Promise<boolean>;
    isStudent(id: ObjectId): Promise<boolean>;
    isBanned(id: string): Promise<boolean>;
}
