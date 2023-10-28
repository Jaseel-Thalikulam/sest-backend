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
import AWS from 'aws-sdk';
import * as sharp from 'sharp';
import { ProfileDto } from '../../common/DTO/tutorProfileDTO';
import Busboy from 'busboy';
import { search_Service } from '../../common/services/search.service';
import { Edit_ProfileService } from '../../common/services/profile.service';
import { Request, Response } from 'express';
import { CategoryService } from 'src/infrastructure/core/common/services/category.service';
import { TutorCategoryDTO } from '../dto/insertCategoryDTO';
import { tutor_CategoryService } from './services/tutor_Category.service';
import { fetchChatsDto } from '../../common/DTO/chat/fetchChatsDto';
import { accessChatDto } from '../../common/DTO/chat/creatChatDTO';
import { ChatService } from '../../common/services/chat.service';
import { PaymentService } from '../../common/services/payment.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { PostService } from '../../common/services/post.service';
import { ArticleDataDto } from '../../common/DTO/post/articleDataDto';
import { relationship_Service } from '../../common/services/relationship.service';
import { StudentHomePageService } from '../../student/modules/services/homepage.service';
import { FollowDTO } from '../../student/DTO/UserIdDTO';
import { TutorIdDto } from '../../student/DTO/tutorIdDTO';
import { PollDataDto } from '../../common/DTO/post/pollDataDto';
import { MediaDataDto } from '../../common/DTO/post/mediaDataDto';
import IDeletePostDto from '../../common/DTO/post/deletePostDto';
import { LikePostDTO } from '../../common/DTO/post/likePostDto';
import CommentDataDTO from '../../common/DTO/post/commentDataDto';
import CommentAPIDto from '../../common/DTO/post/CommentAPIDto';
import { searchQueryDTO } from '../../common/DTO/search/searchQuerydto';
import { JitsiMeetDataDTO } from '../../common/DTO/meet/JistimeetDTO';
import { MeetService } from '../../common/services/meet.service';
import { S3Service } from './services/S3.service';
import { CourseService } from '../../common/services/course.service';
import { createCourseDTO } from '../../common/DTO/course/createCourseDTO';
import { uploadVideoDTO } from '../../common/DTO/video/uploadvideoDTO';
import { upload_Service } from '../../upload/upload.service';
import { PaymentDTO } from '../../common/DTO/payment/paymentDTO';
import { SubscriptionDTO } from '../../common/DTO/subscription/subscriptionDto';
import { Subscription_service } from '../../common/services/subscription.service';
import { getSubscriptionDetailDTO } from '../../common/DTO/subscription/getSubscriptionDetailDTO';
@Controller('/lead')
export class TutorController {
  private readonly s3: AWS.S3;
  constructor(
    private subscriptionService: Subscription_service,
    private paymentService: PaymentService,
    private uploadService: upload_Service,
    private courseService: CourseService,
    private s3Service: S3Service,
    private meetService: MeetService,
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
    console.log(data, 'data from ::)s');
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
      res.json({ success: false, message: 'Server Error' });
    }
  }
  @Post('/create/course')
  @UseInterceptors(FileInterceptor('coverImage'))
  async CreateCourse(
    @UploadedFile() coverImage: Express.Multer.File,
    @Body('tutorId') tutorId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('category') category: string,
    @Res() res: Response,
  ) {
    try {
      const CourseData: createCourseDTO = {
        coverImage,
        tutorId,
        title,
        description,
        category,
      };

      console.log(CourseData);

      const response = await this.courseService.createCourse(CourseData);
      res.json({ success: true, CourseData: response });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/upload/video')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  async UploadVideo(
    @UploadedFiles()
    files: { video?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
    @Body('title') title: string,
    @Body('courseId') courseId: string,
    @Body('userId') userId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { ThumbnailURL } = await this.uploadService.uploadThumbnail(
        files.thumbnail[0],
      );

      const URL = await this.s3Service.upload(
        files.video[0].originalname,
        files.video[0].buffer,
      );

      const VideoData: uploadVideoDTO = {
        title,
        courseId,
        userId,
        URL,
        ThumbnailURL,
      };
      const response = await this.courseService.addVideo(VideoData);

      res.json({
        success: response.success,
        message: response.message,
        videoData: response.videoDBdata,
      });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Server Error' });
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
      if (!userId) {
        console.log('nononio');
      }

      console.log('called', userId);
      const follwingUsers =
        await this.relationShipService.fetchAllFollowingUsers(userId);

      const FeedPost = await this.postService.fetchFeedPosts(follwingUsers);

      res.json({ success: true, FeedPost });
    } catch (err) {
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

  @Get('/userPost')
  async fetchUserPost(@Query('userId') userId: string, @Res() res: Response) {
    try {
      const FeedPost = await this.postService.fetchUserPost(userId);

      res.json({ success: true, FeedPost });
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

      console.log(response);
      res.json({ success: response.success, plan: response.plan });
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
  async handleDeleteComment(@Res() res: Response, @Body() data: CommentAPIDto) {
    try {
      const response = await this.postService.deleteComment(data);

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

  @Post('/post/like')
  async likePost(@Body() Postlikedata: LikePostDTO, @Res() res: Response) {
    try {
      const response = await this.postService.likePost(Postlikedata);

      res.json({ success: response.success, Postdata: response.data });
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
    @Body() Commentlikedata: CommentAPIDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.postService.likeComment(Commentlikedata);

      res.json({ success: response.success, Postdata: response.data });
    } catch (err) {
      res.json({ success: false, message: 'Server Error' });
    }
  }

  @Post('/post/addComment')
  async addComment(@Body() commentData: CommentDataDTO, @Res() res: Response) {
    try {
      const response = await this.postService.addComment(commentData);

      res.json({ success: response.success, Postdata: response.data });
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
        Postdata: response.data,
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

      res.json({ success: true, Data: response });
    } catch (err) {
      res.json({ success: false, message: 'Internal Error' });
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
