import { StudentHomePageService } from './services/homepage.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { TutorIdDto } from '../DTO/tutorIdDTO';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
import { Edit_ProfileService } from '../../common/services/profile.service';
import { search_Service } from '../../common/services/search.service';
import { accessChatDto } from '../../common/DTO/chat/creatChatDTO';
import { ChatService } from '../../common/services/chat.service';
import { fetchChatsDto } from '../../common/DTO/chat/fetchChatsDto';
import { FollowDTO } from '../DTO/UserIdDTO';
import { relationship_Service } from '../../common/services/relationship.service';
import { categorySchema } from 'src/infrastructure/database/schema/Category';
import { PostService } from '../../common/services/post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleDataDto } from '../../common/DTO/post/articleDataDto';
import IDeletePostDto from '../../common/DTO/post/deletePostDto';
import { LikePostDTO } from '../../common/DTO/post/likePostDto';
import CommentDataDTO from '../../common/DTO/post/commentDataDto';
import CommentAPIDto from '../../common/DTO/post/CommentAPIDto';
import { searchQueryDTO } from '../../common/DTO/search/searchQuerydto';
import { MeetService } from '../../common/services/meet.service';
import { JitsiMeetDataDTO } from '../../common/DTO/meet/JistimeetDTO';
import { CourseService } from '../../common/services/course.service';
import { getSubscriptionDetailDTO } from '../../common/DTO/subscription/getSubscriptionDetailDTO';
import { Subscription_service } from '../../common/services/subscription.service';
import { PaymentDTO } from '../../common/DTO/payment/paymentDTO';
import { PaymentService } from '../../common/services/payment.service';
import { SubscriptionDTO } from '../../common/DTO/subscription/subscriptionDto';
import { S3Service } from '../../tutor/modules/services/S3.service';

@Controller('learn')
export default class StudentController {
  constructor(
    private s3Service: S3Service,
    private subscriptionService: Subscription_service,
    private courseService: CourseService,
    private chatService: ChatService,
    private meetService: MeetService,
    private relationShipService: relationship_Service,
    private studentHomePageService: StudentHomePageService,
    private _Edit_ProfileService: Edit_ProfileService,
    private _Post_Services: PostService,
    private _Search_Services: search_Service,
    private paymentService: PaymentService,
  ) {}

  @Post('/Subscription/Payment')
  async SubscriptionPayment(
    @Body() PaymentDetails: PaymentDTO,
    @Res() res: Response,
  ) {
    try {
      const isAlreadySubscribed =
        await this.subscriptionService.isAlreadySubscribed(PaymentDetails);
      if (!isAlreadySubscribed) {
        const response = await this.paymentService.executepayment(
          PaymentDetails,
        );
        res.json({
          success: response.success,
          client_secret: response.client_secret,
        });
      } else {
        res.json({ success: false, message: 'Already Subscribed' });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/addSubscription')
  async AddSubscription(
    @Body() SubscriptionDetails: SubscriptionDTO,
    @Res() res: Response,
  ) {
    try {
      const response = await this.subscriptionService.createSubscription(
        SubscriptionDetails,
      );

      res.json({ success: response.success });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/getvideoData')
  async getvideoData(@Query('videoId') videoId: string, @Res() res: Response) {
    try {
      const response = await this.courseService.getVideodata(videoId);

      response.URL = await this.s3Service.getSignedUrl(response.URL);

      res.json({
        success: true,
        message: 'SuccessFullty Fetched',
        videoData: response,
      });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/getCourseDetail')
  async getcourseDetail(
    @Query('CourseId') CourseId: string,
    @Res() res: Response,
  ) {
    try {
      const CourseData = await this.courseService.findCourseById(CourseId);
      res.json({ success: true, CourseData });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Internal Error' });
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

  @Post('/editprofile')
  async postUser(@Body() user: ProfileDto, @Res() res: Response) {
    try {
      const response = await this._Edit_ProfileService.editProfile(user);

      res.json({
        success: response.success,
        message: response.message,
        userData: response.userData,
      });
    } catch (err) {}
  }

  @Get('/gettutorcourses')
  async fetchTutorCourses(
    @Query('tutorId') tutorId: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.courseService.findCourseByPublisherId(
        tutorId,
      );
      res.json({ success: true, Corusedata: response });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Get('/getSubscriptionDetails')
  async getSubscriptionDetails(
    @Query('TutorId') TutorId: string,
    @Query('StudentId') StudentId: string,
    @Res() res: Response,
  ) {
    try {
      const SubscriptionDetail: getSubscriptionDetailDTO = {
        TutorId,
        StudentId,
      };

      const response = await this.subscriptionService.getSubscriptionDetail(
        SubscriptionDetail,
      );

      res.json({ success: response.success, plan: response.plan });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
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
    try {
      const response = await this.chatService.fetchMessages(chatId);

      res.json({
        success: true,
        message: 'Successfully Fetched',
        data: response,
      });
    } catch (err) {
      res.json({
        success: false,
        message: 'Internal error',
      });
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

      res.json({ success: true, Data: response });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Internal Error' });
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

      const response = await this._Post_Services.uploadArticle(ArticleData);
      res.json({ success: response.success });
    } catch (err) {
      res.json({ success: false });
    }
  }
  @Post('/post/like')
  async likePost(@Body() Postlikedata: LikePostDTO, @Res() res: Response) {
    try {
      const response = await this._Post_Services.likePost(Postlikedata);

      res.json({ success: response.success, Postdata: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }
  @Delete('/deletepost')
  async handleDeletePost(@Res() res: Response, @Body() data: IDeletePostDto) {
    try {
      const response = await this._Post_Services.deletePost(data);

      res.json({ success: response.success, message: response.message });
    } catch (err) {
      res.json({ success: false, messsage: 'Server Error' });
    }
  }
  //unconfirmed
  @Delete('/post/deletecomment')
  async handleDeleteComment(@Res() res: Response, @Body() data: CommentAPIDto) {
    try {
      const response = await this._Post_Services.deleteComment(data);

      res.json({
        success: response.success,
        message: response.message,
        Postdata: response.data,
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, messsage: 'Server Error' });
    }
  }
  @Post('/post/likecomment')
  async likeComment(
    @Body() Commentlikedata: CommentAPIDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this._Post_Services.likeComment(Commentlikedata);

      res.json({ success: response.success, Postdata: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/post/addComment')
  async addComment(@Body() commentData: CommentDataDTO, @Res() res: Response) {
    try {
      const response = await this._Post_Services.addComment(commentData);

      res.json({ success: response.success, Postdata: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }
  @Get('/userPost')
  async fetchUserPost(@Query('userId') userId: string, @Res() res: Response) {
    try {
      const FeedPost = await this._Post_Services.fetchUserPost(userId);

      res.json({ success: true, FeedPost });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
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

  @Get('/fetchFeedPost')
  async fetchFeedPost(@Query('userId') userId: string, @Res() res: Response) {
    try {
      const follwingUsers =
        await this.relationShipService.fetchAllFollowingUsers(userId);

      const FeedPost = await this._Post_Services.fetchFeedPosts(follwingUsers);

      res.json({ success: true, FeedPost });
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
  @Get('/meet/token')
  async getMeetToken(
    @Query('meetData') meetData: JitsiMeetDataDTO,
    @Res() res: Response,
  ) {
    try {
      const response = await this.meetService.generateToken(meetData);

      res.json({ success: true, token: response });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Server Error' });
    }
  }
}
