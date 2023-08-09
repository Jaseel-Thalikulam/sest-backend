import { mongooseCategoryRepository } from '../../../database/repositories/category/mongooseCategoryRepository';
import { mongooseSuperAdminRepository } from '../../../database/repositories/superadmin/mongooseAdminRepository';
import { UserListService } from './services/userList/usersList.service';
import { CategoryService } from '../../common/category/category.service';
import { categorySchema } from '../../../database/schema/Category';
import UserListController from './SuperAdmin.controller';
import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import add_Category_UseCase from 'src/Domain/usecase/superadmin/addCategoryuseCase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: categorySchema,
      },
    ]),
  ],
  controllers: [UserListController],
  providers: [
    UserListService,
    CategoryService,
    mongooseSuperAdminRepository,
    mongooseCategoryRepository,
    add_Category_UseCase
  ],
})
export class SuperAdminModule {}
