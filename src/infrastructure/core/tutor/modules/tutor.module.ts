import { UserSchema } from '../../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import edit_Tutor_Profile from 'src/Domain/usecase/tutor/editTutorProfile';
import { mongooseTutorRepository } from 'src/infrastructure/database/repositories/tutor/mongoosetutorRepository';
import { Edit_tutorController } from './tutor.controller';
import { Edit_tutorService } from './services/edit_tutor.service';
import { CategoryService } from 'src/infrastructure/services/category/category.service';
import { mongooseCategoryRepository } from 'src/infrastructure/database/repositories/category/mongooseCategoryRepository';
import add_Category_UseCase from 'src/Domain/usecase/superadmin/addCategoryuseCase';
import { categorySchema } from 'src/infrastructure/database/schema/Category';
import { tutor_CategoryService } from './services/tutor_Category.service';
import insertTutorCategoryuseCase from 'src/Domain/usecase/tutor/insertCategoryuseCase';
import removeTutorCategoryuseCase from 'src/Domain/usecase/tutor/removeCategoryuseCase';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]), MongooseModule.forFeature([
      {
        name: 'Category',
        schema: categorySchema,
      },
    ])
  ],
  controllers: [Edit_tutorController],
  providers: [Edit_tutorService, mongooseTutorRepository, edit_Tutor_Profile,CategoryService,mongooseCategoryRepository,add_Category_UseCase,tutor_CategoryService,insertTutorCategoryuseCase,removeTutorCategoryuseCase],
})
export class tutorModule {}
