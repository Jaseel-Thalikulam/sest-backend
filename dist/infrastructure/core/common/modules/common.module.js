"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonModule = void 0;
const common_1 = require("@nestjs/common");
const common_controller_1 = require("./common.controller");
const register_service_1 = require("../services/register.service");
const mongoose_1 = require("@nestjs/mongoose");
const User_1 = require("../../../database/schema/User");
const mongooseUserRepository_1 = require("../../../database/repositories/common/mongooseUserRepository");
const email_service_1 = require("../../../utilities/email/email.service");
const createUser_1 = require("../../../../Domain/usecase/common/createUser");
const verifyUser_1 = require("../../../../Domain/usecase/common/verifyUser");
const updateUserPassword_1 = require("../../../../Domain/usecase/common/updateUserPassword");
const login_service_1 = require("../services/login.service");
const loginUser_1 = require("../../../../Domain/usecase/common/loginUser");
const course_service_1 = require("../services/course.service");
const cloudinary_uploaduseCase_1 = require("../../../../Domain/usecase/upload/cloudinary.uploaduseCase");
const createCourseuseCase_1 = require("../../../../Domain/usecase/common/course/createCourseuseCase");
const mongoosevideorepository_1 = require("../../../database/repositories/video/mongoosevideorepository");
const mongoosecourserepository_1 = require("../../../database/repositories/course/mongoosecourserepository");
const Video_1 = require("../../../database/schema/Video");
const Course_1 = require("../../../database/schema/Course");
let CommonModule = exports.CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: User_1.UserSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Video',
                    schema: Video_1.videoSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Course',
                    schema: Course_1.courseSchema,
                },
            ]),
        ],
        controllers: [common_controller_1.CommonController],
        providers: [
            register_service_1.RegisterService,
            course_service_1.CourseService,
            cloudinary_uploaduseCase_1.default,
            createCourseuseCase_1.default,
            mongoosevideorepository_1.mongoosevideoRepository,
            mongoosecourserepository_1.mongooseCourseRepository,
            login_service_1.LoginService,
            mongooseUserRepository_1.mongooseUserRepository,
            loginUser_1.default,
            email_service_1.EmailService,
            createUser_1.default,
            verifyUser_1.default,
            updateUserPassword_1.default,
        ],
    })
], CommonModule);
//# sourceMappingURL=common.module.js.map