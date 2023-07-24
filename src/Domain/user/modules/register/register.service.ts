
import { HttpException, Injectable } from '@nestjs/common';
import { RegisterDto } from '../../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { registerGateway } from '../../../../database/gateways/registerGateway';
import * as jwt from 'jsonwebtoken';
import { EmailService } from 'src/services/email/email.service';
import * as dotenv from 'dotenv';
import { VerifyDto } from '../../DTO/verifyotpdto';
import { resendOTPDto } from '../../DTO/resendOTPdto';
import { ForgetPasswordDto } from '../../DTO/forgetPassword.dto';
import { verifyOTPandUpdateDTO } from '../../DTO/verifyOTPandUpdatePassword';
import { LoginDto } from '../../dto/login.dto';
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY
@Injectable()
export class RegisterService {
  private readonly _registerGateway: registerGateway;
  constructor(registerGateway: registerGateway, private emailService: EmailService) {
    this._registerGateway = registerGateway;
  }

  public async createUser(User: RegisterDto) {
    try {



      const userData = await this._registerGateway.find(User)



      if (!userData || userData.isVerified === false) {
        if (userData && userData.isVerified === false) {
          console.log("hleoooo false only");
          this._registerGateway.RemoveUser(userData._id)
        }
        const hashedPassword = await bcrypt.hash(User.password, 10);
        let newUser = {
          name: User.name,
          email: User.email,
          phoneNumber: User.phoneNumber,
          role: User.role,
          isVerified: User.isVerified,
          password: hashedPassword,
          isBanned: false
        };

        let response = await this._registerGateway.create(newUser);

        this.emailService.SendEmailOTP(User.email, response._id);


        if (response) {
          let token

          if (response.isVerified) {
            token = jwt.sign({ userId: response._id }, SECRECT_KEY);
          }

          return { success: true, message: "Created", token, data: response }
        }

      } else {

        return { success: false, message: "User Already Exist" }
      }

    } catch (err) {
      console.log(err)
    }
  }

  public async verifyOTP(data: VerifyDto) {

    const userData = await this._registerGateway.getUserData(data)
    const OTP_DB_CODE = userData.otp.code
    const OTP_EXPIRY = userData.otp.expiresAt.getTime();
    const OTP_USER = data.OTP

    if (OTP_DB_CODE == OTP_USER && OTP_EXPIRY > Date.now()) { 

      const response = await this._registerGateway.SetAsVerified(data.userId)

      console.log(response, "reg service");

      let token = jwt.sign({ userId: response._id }, SECRECT_KEY);

      return { success: true, data: response, token }

    } else if (OTP_DB_CODE != OTP_USER) {

      return { success: false, message: "Invalid OTP" }

    } else if (OTP_EXPIRY < Date.now()) {

      return { success: false, message: "OTP expired please request again" }
    }


  }

  public async reSendOTP(data: resendOTPDto) {
    this.emailService.SendEmailOTP(data.email, data.userId);
  }

  public async forgetPassword(data: ForgetPasswordDto) {
    const userData = await this._registerGateway.findUser(data)
    console.log(userData, "from reg service");

    if (!userData) {
      return { success: false, message: "Looks like you're new here. Create an account to proceed" }
    } else if (userData.isVerified == false) {
      return { success: false, message: "Looks like you're new here. Create an account to proceed" }
    } else {
      this.emailService.SendEmailOTP(userData.email, userData._id)
      return {success:true,userData,}
    }

  }

  public async VerifyOtpAndUpdatePassword(data: verifyOTPandUpdateDTO) {
    const userData = await this._registerGateway.findUserData(data)
    console.log(userData, "from reg service for password change")
    const OTP_DB_CODE = userData.otp.code
    const OTP_EXPIRY = userData.otp.expiresAt.getTime();
    const OTP_USER = data.OTP
    const password =data.password

    if (OTP_DB_CODE == OTP_USER && OTP_EXPIRY > Date.now()) { 

      const hashedPassword = await bcrypt.hash(password, 10);

      let  userDetails : LoginDto
       userDetails = {
        password: hashedPassword,
        email: userData.email
      };

     const user = this._registerGateway.UpdatePassword(userDetails)

      console.log("password updated");
      
      

    } else if (OTP_DB_CODE != OTP_USER) {

      return { success: false, message: "Invalid OTP" }

    } else if (OTP_EXPIRY < Date.now()) {

      return { success: false, message: "OTP expired please request again" }
    }
    

  }
}
