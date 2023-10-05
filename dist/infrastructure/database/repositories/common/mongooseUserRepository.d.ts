/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import IUserRepository from '../../../../Domain/interfaces/user.interface';
import { LoginDto } from '../../../core/common/DTO/login.dto';
import User from '../../../../Domain/entity/user.entity';
import { Model, ObjectId } from 'mongoose';
import { ProfileDto } from 'src/infrastructure/core/common/DTO/tutorProfileDTO';
import { searchQueryDTO } from 'src/infrastructure/core/common/DTO/search/searchQuerydto';
export declare class mongooseUserRepository implements IUserRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createUser(user: User): Promise<User>;
    getUserByUsername(username: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<User | null>;
    addExpiryOTP(id: ObjectId, OTP: number): Promise<void>;
    findUserById(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    SetAsVerified(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    removeUser(id: ObjectId): Promise<void>;
    UpdatePassword(userDetails: LoginDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    UpdateProfile(userdata: ProfileDto): Promise<{
        success: boolean;
        message: string;
        userData: import("mongoose").Document<unknown, {}, User> & User & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
    } | {
        success: boolean;
        message: string;
        userData?: undefined;
    }>;
    findTutorsByUserId(data: searchQueryDTO): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
    findStudentsByUserId(data: searchQueryDTO): Promise<(import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
}
