import { RegisterService } from '../services/register.service';
import { RegisterDto } from '../DTO/register.dto';
import { Response } from 'express';
import { VerifyDto } from '../DTO/verifyotpdto';
import { resendOTPDto } from '../DTO/resendOTPdto';
import { ForgetPasswordDto } from '../DTO/forgetPassword.dto';
import { verifyOTPandUpdateDTO } from '../DTO/verifyOTPandUpdatePassword';
import { LoginDto } from '../DTO/login.dto';
import { LoginService } from '../services/login.service';
import { CourseService } from '../services/course.service';
export declare class CommonController {
    private registerService;
    private loginService;
    private courseService;
    constructor(registerService: RegisterService, loginService: LoginService, courseService: CourseService);
    verifyUser(user: LoginDto, res: Response): Promise<Response<any, Record<string, any>>>;
    postUser(user: RegisterDto, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyOTP(data: VerifyDto, res: Response): Promise<Response<any, Record<string, any>>>;
    reSendOTP(data: resendOTPDto): Promise<void>;
    forgetPassword(data: ForgetPasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
    VerifyOtpAndUpdatePassword(data: verifyOTPandUpdateDTO, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllCourse(res: Response): Promise<void>;
}
