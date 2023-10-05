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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonController = void 0;
const common_1 = require("@nestjs/common");
const register_service_1 = require("../services/register.service");
const register_dto_1 = require("../DTO/register.dto");
const verifyotpdto_1 = require("../DTO/verifyotpdto");
const resendOTPdto_1 = require("../DTO/resendOTPdto");
const forgetPassword_dto_1 = require("../DTO/forgetPassword.dto");
const verifyOTPandUpdatePassword_1 = require("../DTO/verifyOTPandUpdatePassword");
const login_dto_1 = require("../DTO/login.dto");
const login_service_1 = require("../services/login.service");
const course_service_1 = require("../services/course.service");
let CommonController = exports.CommonController = class CommonController {
    constructor(registerService, loginService, courseService) {
        this.registerService = registerService;
        this.loginService = loginService;
        this.courseService = courseService;
    }
    async verifyUser(user, res) {
        const response = await this.loginService.verifyUser(user);
        if (response.success) {
            const data = response.data;
            if (data.role == 'Learn') {
                res.cookie('jwt-learn', response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
            }
            else if (data.role == 'Lead') {
                res.cookie('jwt-lead', response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
            }
            else if (data.role == 'Admin') {
                res.cookie('jwt-admin', response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
            }
            else if (data.role == 'SuperAdmin') {
                res.cookie('jwt-super_admin', response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
            }
            return res.json({
                success: response.success,
                message: response.message,
                userData: response.data,
                token: response.token,
            });
        }
        else {
            return res.json({ success: response.success, message: response.message });
        }
    }
    async postUser(user, res) {
        console.log(user, 'helooo registeer');
        const response = await this.registerService.createUser(user);
        console.log(response, 'responseeee');
        if (response.success) {
            const data = response.data;
            if (data.isVerified) {
                if (data.role == 'Learn') {
                    res.cookie('jwt-learn', response.token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'none',
                        secure: true,
                    });
                }
                else if (data.role == 'Lead') {
                    res.cookie('jwt-lead', response.token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                        sameSite: 'none',
                        secure: true,
                    });
                }
            }
            return res.json({
                success: response.success,
                message: response.message,
                userData: response.data,
                token: response.token,
            });
        }
        else {
            return res.json({ success: response.success, message: response.message });
        }
    }
    async verifyOTP(data, res) {
        console.log('yesss');
        const response = await this.registerService.verifyOTP(data);
        if (response.success) {
            const data = response.data;
            if (data.role == 'Learn') {
                res.cookie('jwt-learn', response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
            }
            else if (data.role == 'Lead') {
                res.cookie('jwt-lead', response.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'none',
                    secure: true,
                });
            }
            return res.json({
                success: response.success,
                message: response.message,
                token: response.token,
                userData: response.data,
            });
        }
    }
    async reSendOTP(data) {
        this.registerService.reSendOTP(data);
    }
    async forgetPassword(data, res) {
        const response = await this.registerService.forgetPassword(data);
        if (response.success) {
            return res.json({
                success: response.success,
                userData: response.userData,
            });
        }
        else {
            return res.json({ success: response.success, message: response.message });
        }
    }
    async VerifyOtpAndUpdatePassword(data, res) {
        const response = await this.registerService.VerifyOtpAndUpdatePassword(data);
        if (response.success) {
            return res.json({
                success: response.success,
                token: response.token,
                userData: response.userData,
            });
        }
        else {
            return res.json({ success: response.success, message: response.message });
        }
    }
    async getAllCourse(res) {
        const response = await this.courseService.getAllCourse();
        console.log(response);
        res.json({ success: true, Corusedata: response });
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "postUser", null);
__decorate([
    (0, common_1.Post)('verifyotp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyotpdto_1.VerifyDto, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)('resendotp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resendOTPdto_1.resendOTPDto]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "reSendOTP", null);
__decorate([
    (0, common_1.Post)('forgetpassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgetPassword_dto_1.ForgetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "forgetPassword", null);
__decorate([
    (0, common_1.Post)('newPasswordverifyotp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifyOTPandUpdatePassword_1.verifyOTPandUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "VerifyOtpAndUpdatePassword", null);
__decorate([
    (0, common_1.Get)('getallcourses'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommonController.prototype, "getAllCourse", null);
exports.CommonController = CommonController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [register_service_1.RegisterService,
        login_service_1.LoginService,
        course_service_1.CourseService])
], CommonController);
//# sourceMappingURL=common.controller.js.map