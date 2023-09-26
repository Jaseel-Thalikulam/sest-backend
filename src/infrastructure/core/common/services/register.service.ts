import { mongooseUserRepository } from '../../../database/repositories/common/mongooseUserRepository';
import updateUserPasswordUseCase from '../../../../Domain/usecase/common/updateUserPassword';
import createUserUseCase from '../../../../Domain/usecase/common/createUser';
import verifyUserUseCase from '../../../../Domain/usecase/common/verifyUser';
import { verifyOTPandUpdateDTO } from '../DTO/verifyOTPandUpdatePassword';
import { EmailService } from '../../../utilities/email/email.service';
import { ForgetPasswordDto } from '../DTO/forgetPassword.dto';
import { resendOTPDto } from '../DTO/resendOTPdto';
import { RegisterDto } from '../DTO/register.dto';
import { VerifyDto } from '../DTO/verifyotpdto';
import { LoginDto } from '../DTO/login.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  private readonly _UserRepository!: mongooseUserRepository;
  private readonly _CreateUserUseCase: createUserUseCase;
  private readonly _verifyUserUseCase: verifyUserUseCase;
  private readonly _emailServiceUseCase: EmailService;
  private readonly _updateUserPasswordUseCase: updateUserPasswordUseCase;
  constructor(
    userRepository: mongooseUserRepository,
    CreateUserUseCase: createUserUseCase,
    verifyUserUseCase: verifyUserUseCase,
    updateUserPasswordUseCase: updateUserPasswordUseCase,
    emailServiceUseCase: EmailService,
  ) {
    this._CreateUserUseCase = CreateUserUseCase;
    this._verifyUserUseCase = verifyUserUseCase;
    this._updateUserPasswordUseCase = updateUserPasswordUseCase;
    this._UserRepository = userRepository;
    this._emailServiceUseCase = emailServiceUseCase;
  }

  public async createUser(User: RegisterDto) {
    try {
      const userData = await this._UserRepository.findUserByEmail(User.email);

      console.log(userData, 'dataaaaa from service');
      if (!userData || userData.isVerified === false) {
        if (userData && userData.isVerified === false) {
          this._UserRepository.removeUser(userData._id);
        }

        const response = await this._CreateUserUseCase.execute(User);

        if (response.token) {
          return {
            success: true,
            message: 'Created',
            token: response.token,
            data: response.createdUser,
          };
        } else {
          return {
            success: true,
            message: 'Created',
            data: response.createdUser,
          };
        }
      } else {
        return { success: false, message: 'User Already Exist' };
      }
    } catch (err) {
      return { success: false, message: 'Server error' };
      console.log(err);
    }
  }

  public async verifyOTP(data: VerifyDto) {
    const userData = await this._UserRepository.findUserById(data.userId);

    const OTP_DB_CODE = userData.otp.code;
    const OTP_EXPIRY = userData.otp.expiresAt.getTime();
    const OTP_USER = data.OTP;

    if (OTP_DB_CODE == OTP_USER && OTP_EXPIRY > Date.now()) {
      const response = await this._verifyUserUseCase.execute(data);

      return {
        success: response.success,
        data: response.data,
        token: response.token,
      };
    } else if (OTP_DB_CODE != OTP_USER) {
      return { success: false, message: 'Invalid OTP' };
    } else if (OTP_EXPIRY < Date.now()) {
      return { success: false, message: 'OTP expired please request again' };
    }
  }

  public async reSendOTP(data: resendOTPDto) {
    this._emailServiceUseCase.SendEmailOTP(data.email, data.userId);
  }

  public async forgetPassword(data: ForgetPasswordDto) {
    const userData = await this._UserRepository.findUserByEmail(data.email);
    console.log(userData, 'from reg service');

    if (!userData) {
      return {
        success: false,
        message: "Looks like you're new here. Create an account to proceed",
      };
    } else if (userData.isVerified == false) {
      return {
        success: false,
        message: "Looks like you're new here. Create an account to proceed",
      };
    } else {
      this._emailServiceUseCase.SendEmailOTP(userData.email, userData._id);
      return { success: true, userData };
    }
  }

  public async VerifyOtpAndUpdatePassword(data: verifyOTPandUpdateDTO) {
    const userData = await this._UserRepository.findUserByEmail(data.email);
    console.log(userData, 'from reg service for password change');
    const OTP_DB_CODE = userData.otp.code;
    const OTP_EXPIRY = userData.otp.expiresAt.getTime();
    const OTP_USER = data.OTP;

    if (OTP_DB_CODE == OTP_USER && OTP_EXPIRY > Date.now()) {
      const userDetails: LoginDto = {
        password: data.password,
        email: userData.email,
      };

      const response = await this._updateUserPasswordUseCase.execute(
        userDetails,
      );

      return { success: true, token: response.token, userData: response.user };
    } else if (OTP_DB_CODE != OTP_USER) {
      return { success: false, message: 'Invalid OTP' };
    } else if (OTP_EXPIRY < Date.now()) {
      return { success: false, message: 'OTP expired please request again' };
    }
  }
}
