"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const mongooseUserRepository_1 = require("../../../database/repositories/common/mongooseUserRepository");
const updateUserPassword_1 = require("../../../../Domain/usecase/common/user/updateUserPassword");
const createUser_1 = require("../../../../Domain/usecase/common/user/createUser");
const verifyUser_1 = require("../../../../Domain/usecase/common/user/verifyUser");
const email_service_1 = require("../../../utilities/email/email.service");
const common_1 = require("@nestjs/common");
let RegisterService = exports.RegisterService = class RegisterService {
    constructor(userRepository, CreateUserUseCase, verifyUserUseCase, updateUserPasswordUseCase, emailServiceUseCase) {
        this._CreateUserUseCase = CreateUserUseCase;
        this._verifyUserUseCase = verifyUserUseCase;
        this._updateUserPasswordUseCase = updateUserPasswordUseCase;
        this._UserRepository = userRepository;
        this._emailServiceUseCase = emailServiceUseCase;
    }
    async createUser(User) {
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
                }
                else {
                    return {
                        success: true,
                        message: 'Created',
                        data: response.createdUser,
                    };
                }
            }
            else {
                return { success: false, message: 'User Already Exist' };
            }
        }
        catch (err) {
            return { success: false, message: 'Server error' };
            console.log(err);
        }
    }
    async verifyOTP(data) {
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
        }
        else if (OTP_DB_CODE != OTP_USER) {
            return { success: false, message: 'Invalid OTP' };
        }
        else if (OTP_EXPIRY < Date.now()) {
            return { success: false, message: 'OTP expired please request again' };
        }
    }
    async reSendOTP(data) {
        this._emailServiceUseCase.SendEmailOTP(data.email, data.userId);
    }
    async forgetPassword(data) {
        const userData = await this._UserRepository.findUserByEmail(data.email);
        console.log(userData, 'from reg service');
        if (!userData) {
            return {
                success: false,
                message: "Looks like you're new here. Create an account to proceed",
            };
        }
        else if (userData.isVerified == false) {
            return {
                success: false,
                message: "Looks like you're new here. Create an account to proceed",
            };
        }
        else {
            this._emailServiceUseCase.SendEmailOTP(userData.email, userData._id);
            return { success: true, userData };
        }
    }
    async VerifyOtpAndUpdatePassword(data) {
        const userData = await this._UserRepository.findUserByEmail(data.email);
        console.log(userData, 'from reg service for password change');
        const OTP_DB_CODE = userData.otp.code;
        const OTP_EXPIRY = userData.otp.expiresAt.getTime();
        const OTP_USER = data.OTP;
        if (OTP_DB_CODE == OTP_USER && OTP_EXPIRY > Date.now()) {
            const userDetails = {
                password: data.password,
                email: userData.email,
            };
            const response = await this._updateUserPasswordUseCase.execute(userDetails);
            return { success: true, token: response.token, userData: response.user };
        }
        else if (OTP_DB_CODE != OTP_USER) {
            return { success: false, message: 'Invalid OTP' };
        }
        else if (OTP_EXPIRY < Date.now()) {
            return { success: false, message: 'OTP expired please request again' };
        }
    }
};
exports.RegisterService = RegisterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseUserRepository_1.mongooseUserRepository,
        createUser_1.default,
        verifyUser_1.default,
        updateUserPassword_1.default,
        email_service_1.EmailService])
], RegisterService);
//# sourceMappingURL=register.service.js.map