"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mongooseMiddlewareRepository_1 = require("./infrastructure/database/repositories/middleware/mongooseMiddlewareRepository");
const mongooseUserRepository_1 = require("./infrastructure/database/repositories/common/mongooseUserRepository");
const Superadmin_middleware_1 = require("./infrastructure/core/superAdmin/middlewares/Superadmin.middleware");
const Tutor_middleware_1 = require("./infrastructure/core/tutor/middlewares/Tutor.middleware");
const common_module_1 = require("./infrastructure/core/common/modules/common.module");
const SuperAdmin_module_1 = require("./infrastructure/core/superAdmin/modules/SuperAdmin.module");
const tutor_module_1 = require("./infrastructure/core/tutor/modules/tutor.module");
const common_1 = require("@nestjs/common");
const User_1 = require("./infrastructure/database/schema/User");
const mailer_1 = require("@nestjs-modules/mailer");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const Student_middleware_1 = require("./infrastructure/core/student/middlewares/Student.middleware");
const student_module_1 = require("./infrastructure/core/student/modules/student.module");
const upload_module_1 = require("./infrastructure/core/upload/upload.module");
const cloudinary_1 = require("cloudinary");
const Chat_1 = require("./infrastructure/database/schema/Chat");
const Message_1 = require("./infrastructure/database/schema/Message");
const chat_module_1 = require("./Domain/utilities/chat/chat.module");
cloudinary_1.v2.config({
    secure: true,
});
dotenv.config();
const TWILIO_SECRECT_KEY = process.env.TWILIO_SECRECT_KEY;
const MONGO_SECRET_KEY = process.env.MONGO_SECRET_KEY;
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(Superadmin_middleware_1.SuperAdminVerifyMiddleware).forRoutes('Superadmin');
        consumer.apply(Tutor_middleware_1.TutorVerifyMiddleware).forRoutes('lead');
        consumer.apply(Student_middleware_1.StudentVerifyMiddleware).forRoutes('learn');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.sendgrid.net',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'apikey',
                        pass: TWILIO_SECRECT_KEY,
                    },
                },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(MONGO_SECRET_KEY),
            common_module_1.CommonModule,
            tutor_module_1.tutorModule,
            upload_module_1.uploadModule,
            SuperAdmin_module_1.SuperAdminModule,
            student_module_1.studentModule,
            chat_module_1.ChatModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: User_1.UserSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Chat',
                    schema: Chat_1.chatSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Message',
                    schema: Message_1.messageSchema,
                },
            ]),
        ],
        providers: [mongooseUserRepository_1.mongooseUserRepository, mongooseMiddlewareRepository_1.mongooseMiddlewareRepository],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map