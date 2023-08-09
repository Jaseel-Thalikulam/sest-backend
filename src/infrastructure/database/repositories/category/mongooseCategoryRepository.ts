import ICategoryRepository from '../../../../Domain/interfaces/category.interface';
import { CategoryDto } from '../../../core/superAdmin/DTO/Category.dto';
import Category from '../../../../Domain/entity/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

export class mongooseCategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel('Category') private readonly CategoryModel: Model<Category>,
  ) {}

  public async createCategory(category: CategoryDto) {

    
    const newCategory = new this.CategoryModel(category);

    return await newCategory.save();

  }

  public async getCategory(Name: string) {
    const response =await this.CategoryModel.findOne({ Name: Name })
    console.log(response,"from categoryy reposeeeee")
    return response !== null;
  }

  // public async updateCategory(id: ObjectId) {
  //   return 
  // }

  public async unlistCategory(id: string) {
    const categoryObjectId = new ObjectId(id); 
    const categorydata = await this.CategoryModel.findById(categoryObjectId)
    console.log(categorydata)

    if (categorydata) {
      categorydata.IsListed = !categorydata.IsListed;

      return await categorydata.save();
    } else {
      return false;
    }
  }

  public getAllCategory() {
    return this.CategoryModel.find({});
  }

  
}
