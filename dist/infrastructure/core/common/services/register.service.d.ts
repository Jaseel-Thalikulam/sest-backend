/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { mongooseUserRepository } from '../../../database/repositories/common/mongooseUserRepository';
import updateUserPasswordUseCase from '../../../../Domain/usecase/common/user/updateUserPassword';
import createUserUseCase from '../../../../Domain/usecase/common/user/createUser';
import verifyUserUseCase from '../../../../Domain/usecase/common/user/verifyUser';
import { verifyOTPandUpdateDTO } from '../DTO/verifyOTPandUpdatePassword';
import { EmailService } from '../../../utilities/email/email.service';
import { ForgetPasswordDto } from '../DTO/forgetPassword.dto';
import { resendOTPDto } from '../DTO/resendOTPdto';
import { RegisterDto } from '../DTO/register.dto';
import { VerifyDto } from '../DTO/verifyotpdto';
export declare class RegisterService {
    private readonly _UserRepository;
    private readonly _CreateUserUseCase;
    private readonly _verifyUserUseCase;
    private readonly _emailServiceUseCase;
    private readonly _updateUserPasswordUseCase;
    constructor(userRepository: mongooseUserRepository, CreateUserUseCase: createUserUseCase, verifyUserUseCase: verifyUserUseCase, updateUserPasswordUseCase: updateUserPasswordUseCase, emailServiceUseCase: EmailService);
    createUser(User: RegisterDto): Promise<{
        success: boolean;
        message: string;
        token: any;
        data: import("../../../../Domain/entity/user.entity").default;
    } | {
        success: boolean;
        message: string;
        data: import("../../../../Domain/entity/user.entity").default;
        token?: undefined;
    } | {
        success: boolean;
        message: string;
        token?: undefined;
        data?: undefined;
    }>;
    verifyOTP(data: VerifyDto): Promise<{
        success: boolean;
        data: import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/user.entity").default> & import("../../../../Domain/entity/user.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
        token: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data?: undefined;
        token?: undefined;
    }>;
    reSendOTP(data: resendOTPDto): Promise<void>;
    forgetPassword(data: ForgetPasswordDto): Promise<{
        success: boolean;
        message: string;
        userData?: undefined;
    } | {
        success: boolean;
        userData: import("../../../../Domain/entity/user.entity").default;
        message?: undefined;
    }>;
    VerifyOtpAndUpdatePassword(data: verifyOTPandUpdateDTO): Promise<{
        success: boolean;
        token: any;
        userData: import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/user.entity").default> & import("../../../../Domain/entity/user.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        token?: undefined;
        userData?: undefined;
    }>;
}
