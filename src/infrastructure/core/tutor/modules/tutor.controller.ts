import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
// import { Edit_tutorService } from './services/edit_tutor.service';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import { Response } from 'express';
import { CategoryService } from 'src/infrastructure/core/common/services/category/category.service';
import { TutorCategoryDTO } from '../dto/insertCategoryDTO';
import { tutor_CategoryService } from './services/tutor_Category.service';

@Controller('/lead')
export class Edit_tutorController {
  constructor(
    private editTutorPriofileService: Edit_ProfileService,
    private tutorCategoryService: tutor_CategoryService,
    private categoryService: CategoryService,
  ) {}

  @Post('/editprofile')
  async postUser(@Body() user: ProfileDto, @Res() res: Response) {
    const response = await this.editTutorPriofileService.editProfile(user);

    console.log(response)
    return res.json({
      success: response.success,
      message: response.message,
      userData: response.userData,
    });
  }

  @Get('/getCategories')
  async getCategories(@Res() res: Response) {
    const response = await this.categoryService.getAllCategory();

    return res.json({ success: response.success, categorydata: response.data });
  }

  @Post('/insertCategory')
  async insertCategory(
    @Body() insertData: TutorCategoryDTO,
    @Res() res: Response,
  ) {
    const response = await this.tutorCategoryService.insertCategory(insertData);

    return res.json({
      success: response.success,
      tutordata: response.tutordata,
      message: response.message,
    });
  }
  @Post('/removeCategory')
  async removeCategory(
    @Body() removeData: TutorCategoryDTO,
    @Res() res: Response,
  ) {
    const response = await this.tutorCategoryService.removeCategory(removeData);

    return res.json({
      success: response.success,
      tutordata: response.tutordata,
      message: response.message,
    });
  }
}
