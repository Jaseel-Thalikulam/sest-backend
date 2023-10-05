import ICategoryRepository from '../../../../Domain/interfaces/category.interface';
import { CategoryDto } from '../../../core/superAdmin/DTO/Category.dto';
import Category from '../../../../Domain/entity/category.entity';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { EditCategoryDto } from 'src/infrastructure/core/superAdmin/DTO/EditCategoryDto';
export declare class mongooseCategoryRepository implements ICategoryRepository {
    private readonly CategoryModel;
    constructor(CategoryModel: Model<Category>);
    createCategory(category: CategoryDto): Promise<mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>>;
    updateCategory(category: EditCategoryDto): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: mongoose.Document<unknown, {}, Category> & Category & Required<{
            _id: mongoose.Schema.Types.ObjectId;
        }>;
        message?: undefined;
    }>;
    getCategory(Name: string): Promise<boolean>;
    unlistCategory(id: string): Promise<false | (mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>)[]>;
    getAllCategory(): mongoose.Query<(mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>)[], mongoose.Document<unknown, {}, Category> & Category & Required<{
        _id: mongoose.Schema.Types.ObjectId;
    }>, {}, Category, "find">;
}
