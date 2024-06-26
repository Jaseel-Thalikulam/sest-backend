/// <reference types="multer" />
import { StudentHomePageService } from './services/homepage.service';
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
import { PostService } from '../../common/services/post.service';
import IDeletePostDto from '../../common/DTO/post/deletePostDto';
import { LikePostDTO } from '../../common/DTO/post/likePostDto';
import CommentDataDTO from '../../common/DTO/post/commentDataDto';
import CommentAPIDto from '../../common/DTO/post/CommentAPIDto';
import { MeetService } from '../../common/services/meet.service';
import { JitsiMeetDataDTO } from '../../common/DTO/meet/JistimeetDTO';
import { CourseService } from '../../common/services/course.service';
import { Subscription_service } from '../../common/services/subscription.service';
import { PaymentDTO } from '../../common/DTO/payment/paymentDTO';
import { PaymentService } from '../../common/services/payment.service';
import { SubscriptionDTO } from '../../common/DTO/subscription/subscriptionDto';
import { S3Service } from '../../tutor/modules/services/S3.service';
export default class StudentController {
    private s3Service;
    private subscriptionService;
    private courseService;
    private chatService;
    private meetService;
    private relationShipService;
    private studentHomePageService;
    private _Edit_ProfileService;
    private _Post_Services;
    private _Search_Services;
    private paymentService;
    constructor(s3Service: S3Service, subscriptionService: Subscription_service, courseService: CourseService, chatService: ChatService, meetService: MeetService, relationShipService: relationship_Service, studentHomePageService: StudentHomePageService, _Edit_ProfileService: Edit_ProfileService, _Post_Services: PostService, _Search_Services: search_Service, paymentService: PaymentService);
    SubscriptionPayment(PaymentDetails: PaymentDTO, res: Response): Promise<void>;
    AddSubscription(SubscriptionDetails: SubscriptionDTO, res: Response): Promise<void>;
    getvideoData(videoId: string, res: Response): Promise<void>;
    getcourseDetail(CourseId: string, res: Response): Promise<void>;
    getAllTutor(res: Response): Promise<void>;
    getUser(userId: TutorIdDto, res: Response): Promise<void>;
    postUser(user: ProfileDto, res: Response): Promise<void>;
    fetchTutorCourses(tutorId: string, res: Response): Promise<void>;
    getSubscriptionDetails(TutorId: string, StudentId: string, res: Response): Promise<void>;
    accessChat(data: accessChatDto, res: Response): Promise<void>;
    fetchChats(data: fetchChatsDto, res: Response): Promise<void>;
    fetchAllMessage(chatId: string, res: Response): Promise<void>;
    Search(searchInput: string, option: string, res: Response): Promise<void>;
    UploadArticle(articleThumbnail: Express.Multer.File, userId: string, timeStamp: string, type: string, articleTitle: string, articleContent: string, res: Response): Promise<void>;
    likePost(Postlikedata: LikePostDTO, res: Response): Promise<void>;
    handleDeletePost(res: Response, data: IDeletePostDto): Promise<void>;
    handleDeleteComment(res: Response, data: CommentAPIDto): Promise<void>;
    likeComment(Commentlikedata: CommentAPIDto, res: Response): Promise<void>;
    addComment(commentData: CommentDataDTO, res: Response): Promise<void>;
    fetchUserPost(userId: string, res: Response): Promise<void>;
    handleFollow(UsersId: FollowDTO, res: Response): Promise<void>;
    handleFollowIndicator(followedBy: string, following: string, res: Response): Promise<void>;
    fetchFeedPost(userId: string, res: Response): Promise<void>;
    getfollowers(userId: string, res: Response): Promise<void>;
    getMeetToken(meetData: JitsiMeetDataDTO, res: Response): Promise<void>;
}
