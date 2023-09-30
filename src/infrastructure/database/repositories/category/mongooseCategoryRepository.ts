import ICategoryRepository from '../../../../Domain/interfaces/category.interface';
import { CategoryDto } from '../../../core/superAdmin/DTO/Category.dto';
import Category from '../../../../Domain/entity/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import mongoose from 'mongoose';
import { EditCategoryDto } from 'src/infrastructure/core/superAdmin/DTO/EditCategoryDto';
const ObjectId = mongoose.Types.ObjectId;

export class mongooseCategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel('Category') private readonly CategoryModel: Model<Category>,
  ) {}

  public async createCategory(category: CategoryDto) {
    const newCategory = new this.CategoryModel(category);

    return await newCategory.save();
  }

  public async updateCategory(category: EditCategoryDto) {
    const { Name, Description, categoryId } = category;
    console.log(categoryId, 'catid');
    const existingCategory = await this.CategoryModel.findById(categoryId);
    console.log(existingCategory);
    if (!existingCategory) {
      return { success: false, message: 'category not exist' };
    }

    // Update the category fields
    existingCategory.Name = Name;
    existingCategory.Description = Description;

    // Save the updated category
    const data = await existingCategory.save();

    return { success: true, data };
  }

  public async getCategory(Name: string) {
    const response = await this.CategoryModel.findOne({ Name: Name });

    return response !== null;
  }

  public async unlistCategory(id: string) {
    const categoryObjectId = new ObjectId(id);
    const categorydata = await this.CategoryModel.findById(categoryObjectId);
    console.log(categorydata);

    if (categorydata) {
      categorydata.IsListed = !categorydata.IsListed;

      const Catdata = await categorydata.save();

      const Arr = [Catdata];

      return Arr;
    } else {
      return false;
    }
  }

  public getAllCategory() {
    return this.CategoryModel.find({});
  }
}
