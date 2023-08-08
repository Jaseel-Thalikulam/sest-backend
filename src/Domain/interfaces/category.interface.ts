import { ObjectId } from 'mongoose';
import Category from '../entity/category.entity';
import { CategoryDto } from 'src/infrastructure/core/superAdmin/DTO/Category.dto';

interface ICategoryRepository {
  createCategory(category: Category): Promise<Category>;
  unlistCategory(id: ObjectId): void;
  getAllCategory(id: CategoryDto): Promise<Category[]>;
  // updateCategory(id: ObjectId): Promise<Category>;
}

export default ICategoryRepository;
