import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TutorProfileDto } from '../dto/tutorProfileDTO';
import { Edit_tutorService } from './services/edit_tutor.service';
import { Response } from 'express';
import { CategoryService } from 'src/infrastructure/services/category/category.service';
import { TutorCategoryDTO } from '../dto/insertCategoryDTO';
import { tutor_CategoryService } from './services/tutor_Category.service';

@Controller('/lead')
export class Edit_tutorController {
  constructor(
    private editTutorPriofileService: Edit_tutorService,
    private tutorCategoryService :tutor_CategoryService,
    private categoryService: CategoryService,
  ) { }

  @Post('/editprofile')
  async postUser(@Body() user: TutorProfileDto, @Res() res: Response) {
    const response = await this.editTutorPriofileService.editTutorProfile(user);

    return res.json({
      success: response.success,
      message: response.message,
      userData: response.userData,
    });
  }

  @Get('/getCategories')
  async getCategories(@Res() res: Response) {
    const response = await this.categoryService.getAllCategory()

    return res.json({ success: true, data: response })
  }

  @Post('/insertCategory')
  async insertCategory(@Body() insertData: TutorCategoryDTO, @Res() res: Response){
    
    const response = await this.tutorCategoryService.insertCategory(insertData)
     
    return res.json({ success: response.success, tutordata: response.tutordata,message:response.message })
  }
  @Post('/removeCategory')
  async removeCategory(@Body() removeData: TutorCategoryDTO, @Res() res: Response){
    
    const response = await this.tutorCategoryService.removeCategory(removeData)
     
    return res.json({ success: response.success, tutordata: response.tutordata,message:response.message })
  }
}
