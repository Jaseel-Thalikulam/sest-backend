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
import { TutorCategoryDTO } from 'src/infrastructure/core/tutor/dto/insertCategoryDTO';
import ITutorRepository, { IResponseaddCategory } from '../../../../Domain/interfaces/tutor.interface';
import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import Category from 'src/Domain/entity/category.entity';
export declare class mongooseTutorRepository implements ITutorRepository {
    private readonly userModel;
    private readonly categoryModel;
    constructor(userModel: Model<User>, categoryModel: Model<Category>);
    addCategory(category: TutorCategoryDTO): Promise<IResponseaddCategory>;
    removeCategory(category: TutorCategoryDTO): Promise<{
        success: boolean;
        message: string;
        tutordata?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        tutordata: import("mongoose").Document<unknown, {}, User> & User & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        tutordata?: undefined;
    }>;
}
