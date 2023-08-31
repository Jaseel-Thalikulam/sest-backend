import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
// import { Edit_tutorService } from './services/edit_tutor.service';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import { Response } from 'express';
import { CategoryService } from 'src/infrastructure/core/common/services/category/category.service';
import { TutorCategoryDTO } from '../dto/insertCategoryDTO';
import { tutor_CategoryService } from './services/tutor_Category.service';
import { FetchAllMessageDTO } from '../../student/DTO/FetchAllMessageDTO';
import { SendMessageDTO } from '../../student/DTO/sendMessageDTO';
import { fetchChatsDto } from '../../common/DTO/chat/fetchChatsDto';
import { accessChatDto } from '../../common/DTO/chat/creatChatDTO';
import { ChatService } from '../../common/services/chat/chat.service';

@Controller('/lead')
export class TutorController {
  constructor(
    private chatService: ChatService,
    private editTutorPriofileService: Edit_ProfileService,
    private tutorCategoryService: tutor_CategoryService,
    private categoryService: CategoryService,
  ) {}

  @Post('/editprofile')
  async postUser(@Body() user: ProfileDto, @Res() res: Response) {
    const response = await this.editTutorPriofileService.editProfile(user);

    console.log(response);
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

  @Post('/chat/access')
  async accessChat(@Body() data: accessChatDto, @Res() res: Response) {
    const response = await this.chatService.accessChat(data);

    res.json({
      success: response.success,
      message: response.message,
      Chat: response.Chat,
    });
  }

  @Post('/chat/fetchallchats')
  async fetchChats(@Body() data: fetchChatsDto, @Res() res: Response) {
    try {
      const response = await this.chatService.fetchChats(data);

      res.json({
        success: response.success,
        message: response.message,
        Chats: response.Chats,
      });
    } catch (err) {
      res.json({ success: false, message: 'Server error' });
    }
  }

  @Get('/chat/fetchAllMessage')
  async fetchAllMessage(@Query('ChatId') chatId: string, @Res() res: Response) {
    const response = await this.chatService.fetchMessages(chatId);
    try {
      res.json({
        success: true,
        message: 'Fetched All Message',
        data: response,
      });
    } catch (err) {
      res.json({ success: false, message: 'Failed to Fetched All Message' });
    }
  }
}
