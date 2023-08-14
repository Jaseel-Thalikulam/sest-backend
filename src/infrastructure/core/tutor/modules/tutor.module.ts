import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { mongooseTutorRepository } from 'src/infrastructure/database/repositories/tutor/mongoosetutorRepository';
import { Edit_tutorController } from './tutor.controller';
import { CategoryService } from 'src/infrastructure/core/common/services/category/category.service';
import { mongooseCategoryRepository } from 'src/infrastructure/database/repositories/category/mongooseCategoryRepository';
import add_Category_UseCase from 'src/Domain/usecase/superadmin/addCategoryuseCase';
import { categorySchema } from 'src/infrastructure/database/schema/Category';
import { tutor_CategoryService } from './services/tutor_Category.service';
import insertTutorCategoryuseCase from 'src/Domain/usecase/tutor/insertCategoryuseCase';
import removeTutorCategoryuseCase from 'src/Domain/usecase/tutor/removeCategoryuseCase';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import edit_Profile_useCase from 'src/Domain/usecase/common/editProfile';
import { mongooseUserRepository } from 'src/infrastructure/database/repositories/common/mongooseUserRepository';

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
  controllers: [Edit_tutorController],
  providers: [
    mongooseTutorRepository,
    edit_Profile_useCase,
    CategoryService,
    mongooseCategoryRepository,
    add_Category_UseCase,
    tutor_CategoryService,
    Edit_ProfileService,
    insertTutorCategoryuseCase,
    removeTutorCategoryuseCase,
    mongooseUserRepository,
  ],
})
export class tutorModule {}
