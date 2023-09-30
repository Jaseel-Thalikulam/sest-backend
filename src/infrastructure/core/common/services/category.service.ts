import { mongooseCategoryRepository } from 'src/infrastructure/database/repositories/category/mongooseCategoryRepository';
import { CategoryDto } from '../../superAdmin/DTO/Category.dto';
import { Injectable } from '@nestjs/common';
import add_Category_UseCase from 'src/Domain/usecase/superadmin/addCategoryuseCase';
import { EditCategoryDto } from 'src/infrastructure/core/superAdmin/DTO/EditCategoryDto';

@Injectable()
export class CategoryService {
  private readonly _CategoryRepository: mongooseCategoryRepository;
  private readonly _addCategoryUseCase: add_Category_UseCase;

  constructor(
    CategoryRepository: mongooseCategoryRepository,
    addCategoryUseCase: add_Category_UseCase,
  ) {
    this._CategoryRepository = CategoryRepository;
    this._addCategoryUseCase = addCategoryUseCase;
  }

  public async getAllCategory() {
    try {
      const categoryArray = await this._CategoryRepository.getAllCategory();

      return { success: true, data: categoryArray };
    } catch (err) {
      console.log(err);
    }
  }

  public async addCategory(category: CategoryDto) {
    const isCategoryExist = await this._CategoryRepository.getCategory(
      category.Name,
    );
    if (!isCategoryExist) {
      await this._addCategoryUseCase.execute(category);

      return { success: true, message: 'Successfully Added' };
    } else {
      return { success: false, message: 'Category Already Exist' };
    }
  }
  public async updateCategory(category: EditCategoryDto) {
    const isCategoryExist = await this._CategoryRepository.getCategory(
      category.Name,
    );
    if (!isCategoryExist) {
      return { success: false, message: 'Category Not Exist', data: null };
    } else {
      return await this._CategoryRepository.updateCategory(category);
    }
  }

  async unlistCategory(id: string) {
    try {
      const data = await this._CategoryRepository.unlistCategory(id);
      return { success: true, message: 'Success', data };
    } catch (err) {
      console.log(err, 'from userlist');

      return { success: false, message: 'Unauthorized' };
    }
  }
}
