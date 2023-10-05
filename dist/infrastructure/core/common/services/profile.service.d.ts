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
import edit_Profile_useCase from '../../../../Domain/usecase/common/editProfile';
import { ProfileDto } from '../DTO/tutorProfileDTO';
export declare class Edit_ProfileService {
    private readonly _edit_Profile_useCase;
    constructor(editTutorProfileUseCase: edit_Profile_useCase);
    editProfile(user: ProfileDto): Promise<{
        success: boolean;
        message: string;
        userData: import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/user.entity").default> & import("../../../../Domain/entity/user.entity").default & Required<{
            _id: import("mongoose").Schema.Types.ObjectId;
        }>;
    } | {
        success: boolean;
        message: string;
        userData?: undefined;
    }>;
}
