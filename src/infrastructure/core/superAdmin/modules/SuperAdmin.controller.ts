import { CategoryDto } from '../DTO/category.dto';
import { CategoryService } from '../../common/services/category/category.service';
import { UserListService } from './services/userList/usersList.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { EditCategoryDto } from '../DTO/EditCategoryDto';

@Controller('/Superadmin')
export default class UserListController {
  constructor(
    private userlistservice: UserListService,
    private categoryservice: CategoryService,
  ) {}

  @Get('/userslist')
  async getAllUser(@Res() res: Response) {
    const response = await this.userlistservice.getAllUsers();
    return res.json({ success: true, data: response });
  }

  @Post('/blockuser')
  async userAccess(@Body() id: string, @Res() res: Response) {
    const response = await this.userlistservice.userAccess(id);

    if (response.success) {
      return res.json({
        success: true,
        Userdata: response.data,
        message: response.message,
      });
    } else {
      return res.json({ success: false, message: response.message });
    }
  }
  @Post('/unlistCategory')
  async unlistCategory(@Body() id: string, @Res() res: Response) {
    const response = await this.categoryservice.unlistCategory(id);

    if (response.success) {
      return res.json({
        success: true,
        categorydata: response.data,
        message: response.message,
      });
    } else {
      return res.json({ success: false, message: response.message });
    }
  }

  @Get('/Categories')
  async getAllCategory(@Res() res: Response) {
    const response = await this.categoryservice.getAllCategory();
    return res.json({ success: response.success, categorydata: response.data });
  }

  @Post('/addCategory')
  async addCategory(@Body() Category: CategoryDto, @Res() res: Response) {
    const response = await this.categoryservice.addCategory(Category);
    console.log(response, 'from add category controller');

    return res.json({ success: response.success, message: response.message });
  }
  @Post('/updateCategory')
  async updateCategory(
    @Body() Category: EditCategoryDto,
    @Res() res: Response,
  ) {
    const response = await this.categoryservice.updateCategory(Category);

    return res.json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  }
}
