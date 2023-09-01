import { StudentHomePageService } from './services/homepage.service';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TutorIdDto } from '../DTO/tutorIdDTO';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import { accessChatDto } from '../../common/DTO/chat/creatChatDTO';
import { ChatService } from '../../common/services/chat/chat.service';
import { fetchChatsDto } from '../../common/DTO/chat/fetchChatsDto';
import { FollowDTO } from '../DTO/UserIdDTO';
import { relationship_Service } from '../../common/services/relationship/relationship.service';
import { categorySchema } from 'src/infrastructure/database/schema/Category';

@Controller('learn')
export default class StudentController {
  constructor(
    private chatService: ChatService,
    private relationShipService: relationship_Service,
    private studentHomePageService: StudentHomePageService,
    private _Edit_ProfileService: Edit_ProfileService,
  ) {}

  @Get('/tutorlist')
  async getAllTutor(@Res() res: Response) {
    const response = await this.studentHomePageService.getAllTutors();

    return res.json({ success: true, Tutorsdata: response });
  }
  @Post('/tutordata')
  async getTutor(@Body() tutorId: TutorIdDto, @Res() res: Response) {
    const response = await this.studentHomePageService.getTutor(tutorId);
    return res.json({ success: true, Tutorsdata: response });
  }

  @Post('/editprofile')
  async postUser(@Body() user: ProfileDto, @Res() res: Response) {
    const response = await this._Edit_ProfileService.editProfile(user);

    return res.json({
      success: response.success,
      message: response.message,
      userData: response.userData,
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
    console.log('called', chatId);
    const response = await this.chatService.fetchMessages(chatId);
    console.log(response);
    res.json({
      success: true,
      message: 'Successfully Fetched',
      data: response,
    });
  }

  @Post('/follow')
  async handleFollow(@Body() UsersId: FollowDTO, @Res() res: Response) {
    try {
      this.relationShipService.handlefollow(UsersId);

      res.json({ success: true, message: 'Successfully completed' });
    } catch (err) {
      res.json({
        success: false,
        message: 'Server Error Unable to Complete the Functionality',
      });
    }
  }

  @Get('/followindicator')
  async handleFollowIndicator(
    @Query('followedBy') followedBy: string,
    @Query('following') following: string,
    @Res() res: Response,
  ) {
    try {
      const UsersId: FollowDTO = {
        followedBy,
        following,
      };

      const isFollowing = await this.relationShipService.isfollowed(UsersId);

      res.json({ success: true, message: 'Success', isFollowing });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }
}
