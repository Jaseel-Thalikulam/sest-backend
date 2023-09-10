import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
import { search_Service } from '../../common/services/search/search.service';
import { Edit_ProfileService } from '../../common/services/profile/profile.service';
import { Response } from 'express';
import { CategoryService } from 'src/infrastructure/core/common/services/category/category.service';
import { TutorCategoryDTO } from '../dto/insertCategoryDTO';
import { tutor_CategoryService } from './services/tutor_Category.service';
import { fetchChatsDto } from '../../common/DTO/chat/fetchChatsDto';
import { accessChatDto } from '../../common/DTO/chat/creatChatDTO';
import { ChatService } from '../../common/services/chat/chat.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from '../../common/services/post/post.service';
import { ArticleDataDto } from '../../common/DTO/post/articleDataDto';
import { relationship_Service } from '../../common/services/relationship/relationship.service';
import { StudentHomePageService } from '../../student/modules/services/homepage.service';
import { FollowDTO } from '../../student/DTO/UserIdDTO';
import { TutorIdDto } from '../../student/DTO/tutorIdDTO';
import { PollDataDto } from '../../common/DTO/post/pollDataDto';
import { MediaDataDto } from '../../common/DTO/post/mediaDataDto';
import IDeletePostDto from '../../common/DTO/post/deletePostDto';
import { ArticleUpdateDataDto } from '../../common/DTO/post/articleupdatedataDto';
import { LikePostDTO } from '../../common/DTO/post/likePostDto';
import CommentDataDTO from '../../common/DTO/post/commentDataDto';
import DeleteCommentDto from '../../common/DTO/post/deleteCommentDto';
import { searchQueryDTO } from '../../common/DTO/search/searchQuerydto';

@Controller('/lead')
export class TutorController {
  constructor(
    private chatService: ChatService,
    private relationShipService: relationship_Service,
    private editTutorPriofileService: Edit_ProfileService,
    private tutorCategoryService: tutor_CategoryService,
    private categoryService: CategoryService,
    private postService: PostService,
    private studentHomePageService: StudentHomePageService,
    private _Search_Services: search_Service,
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

  @Post('/post/article')
  @UseInterceptors(FileInterceptor('articleThumbnail'))
  async UploadArticle(
    @UploadedFile() articleThumbnail: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('timeStamp') timeStamp: string,
    @Body('type') type: string,
    @Body('articleTitle') articleTitle: string,
    @Body('articleContent') articleContent: string,
    @Res() res: Response,
  ) {
    try {
      const ArticleData: ArticleDataDto = {
        userId,
        articleTitle,
        articleContent,
        articleThumbnail,
        type,
        timeStamp,
      };

      const response = await this.postService.uploadArticle(ArticleData);
      res.json({ success: response.success });
    } catch (err) {
      res.json({ success: false });
    }
  }

  @Post('/post/poll')
  async UploadPoll(@Body() pollData: PollDataDto, @Res() res: Response) {
    try {
      await this.postService.uploadPoll(pollData);
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/post/media')
  @UseInterceptors(FileInterceptor('mediaThumbnail'))
  async uploadMedia(
    @UploadedFile() mediaThumbnail: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('timeStamp') timeStamp: string,
    @Body('type') type: string,
    @Body('caption') caption: string,
    @Res() res: Response,
  ) {
    try {
      const MediaData: MediaDataDto = {
        userId,
        mediaThumbnail,
        mediaCaption: caption,
        type,
        timeStamp,
      };

      const response = await this.postService.uploadMedia(MediaData);

      res.json({ success: response.success, message: response.message });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/fetchFeedPost')
  async fetchFeedPost(@Query('userId') userId: string, @Res() res: Response) {
    try {
      const follwingUsers =
        await this.relationShipService.fetchAllFollowingUsers(userId);

      const FeedPost = await this.postService.fetchFeedPosts(follwingUsers);

      res.json({ success: true, FeedPost });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }
  @Get('/userPost')
  async fetchUserPost(@Query('userId') userId: string, @Res() res: Response) {
    try {
      const UserPost = await this.postService.fetchUserPost(userId);

      res.json({ success: true, UserPost });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/tutorlist')
  async getAllTutor(@Res() res: Response) {
    const response = await this.studentHomePageService.getAllTutors();

     res.json({ success: true, Tutorsdata: response });
  }

  @Post('/userdata')
  async getUser(@Body() userId: TutorIdDto, @Res() res: Response) {
  
    const response = await this.studentHomePageService.getTutor(userId);
     res.json({ success: true, Tutorsdata: response });
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

  @Delete('/deletepost')
  async handleDeletePost(@Res() res: Response, @Body() data: IDeletePostDto) {
    try {
      const response = await this.postService.deletePost(data);

      res.json({ success: response.success, message: response.message });
    } catch (err) {
      res.json({ success: false, messsage: 'Server Error' });
    }
  }
  @Delete('/post/deletecomment')
  async handleDeleteComment(
    @Res() res: Response,
    @Body() data: DeleteCommentDto,
  ) {
    try {
      const response = await this.postService.deleteComment(data);

      res.json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, messsage: 'Server Error' });
    }
  }

  // @Post('/post/editarticle')
  // async editArticle(@Body() ArticleData: ArticleUpdateDataDto, @Res() res: Response) {

  // }

  @Post('/post/like')
  async likePost(@Body() Postlikedata: LikePostDTO, @Res() res: Response) {
    try {
      const response = await this.postService.likePost(Postlikedata);

      res.json({ success: response.success, data: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/getfollowers')
  async getfollowers(@Query('userId') userId: string, @Res() res: Response) {
    try {
      const followers = await this.relationShipService.fetchAllFollowers(
        userId,
      );
      const follwingUsers =
        await this.relationShipService.fetchAllFollowingUsers(userId);

      res.json({ success: true, followers, follwingUsers });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/post/likecomment')
  async likeComment(
    @Body() Commentlikedata: DeleteCommentDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.postService.likeComment(Commentlikedata);

      res.json({ success: response.success, data: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/post/addComment')
  async addComment(@Body() commentData: CommentDataDTO, @Res() res: Response) {
    try {
      const response = await this.postService.addComment(commentData);

      res.json({ success: response.success, data: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/post/editmedia')
  @UseInterceptors(FileInterceptor('mediaThumbnail'))
  async editMedia(
    @UploadedFile() mediaThumbnail: Express.Multer.File,
    @Body('userId') userId: string,
    @Body('timeStamp') timeStamp: string,
    @Body('type') type: string,
    @Body('postId') postId: string,
    @Body('caption') caption: string,
    @Res() res: Response,
  ) {
    try {
      const MediaData: MediaDataDto = {
        userId,
        mediaThumbnail,
        mediaCaption: caption,
        type,
        timeStamp,
        postId,
      };

      const response = await this.postService.editMedia(MediaData);
      res.json({
        success: response.success,
        data: response.data,
        message: response.messgae,
      });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/search')
  async Search(
    @Query('searchInput') searchInput: string,
    @Query('option') option: string,
    @Res() res: Response,
  ) {
    try {
      const searchQuery: searchQueryDTO = {
        option,
        searchInput,
      };

      const response = await this._Search_Services.Search(searchQuery);

      res.json({ success: true, data: response });
    } catch (err) {
      res.json({ success: false, message: 'Internal Error' });
    }
  }
}
