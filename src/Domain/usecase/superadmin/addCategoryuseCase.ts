import { Injectable } from '@nestjs/common';
import { CategoryDto } from 'src/infrastructure/core/superAdmin/DTO/Category.dto';
import { mongooseCategoryRepository } from 'src/infrastructure/database/repositories/category/mongooseCategoryRepository';

@Injectable()
class add_Category_UseCase {
    private readonly _CategoryRepository: mongooseCategoryRepository;
  constructor(CategoryRepository: mongooseCategoryRepository) {
    this._CategoryRepository = CategoryRepository;
  }

  async execute(category: CategoryDto) {
    return await this._CategoryRepository.createCategory(category);
  }
}

export default add_Category_UseCase;
