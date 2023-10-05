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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { mongooseCategoryRepository } from 'src/infrastructure/database/repositories/category/mongooseCategoryRepository';
import { CategoryDto } from '../../superAdmin/DTO/Category.dto';
import add_Category_UseCase from 'src/Domain/usecase/superadmin/addCategoryuseCase';
import { EditCategoryDto } from 'src/infrastructure/core/superAdmin/DTO/EditCategoryDto';
export declare class CategoryService {
    private readonly _CategoryRepository;
    private readonly _addCategoryUseCase;
    constructor(CategoryRepository: mongooseCategoryRepository, addCategoryUseCase: add_Category_UseCase);
    getAllCategory(): Promise<{
        success: boolean;
        data: (import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/category.entity").default> & import("../../../../Domain/entity/category.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>)[];
    }>;
    addCategory(category: CategoryDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateCategory(category: EditCategoryDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/category.entity").default> & import("../../../../Domain/entity/category.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any;
    }>;
    unlistCategory(id: string): Promise<{
        success: boolean;
        message: string;
        data: boolean | (import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/category.entity").default> & import("../../../../Domain/entity/category.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>)[];
    } | {
        success: boolean;
        message: string;
        data?: undefined;
    }>;
}
