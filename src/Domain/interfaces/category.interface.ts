import { EditCategoryDto } from 'src/infrastructure/core/superAdmin/DTO/EditCategoryDto';
import Category from '../entity/category.entity';
import { CategoryDto } from 'src/infrastructure/core/superAdmin/DTO/Category.dto';

interface ICategoryRepository {
  createCategory(category: Category): Promise<Category>;
  unlistCategory(id: string): void;
  getAllCategory(id: CategoryDto): Promise<Category[]>;
  updateCategory(category: EditCategoryDto): Promise<{
    success: boolean;
    message?: string;
    data?: Category;
  }>;
}

export default ICategoryRepository;
