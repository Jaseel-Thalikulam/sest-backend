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
import { createCourseDTO } from '../DTO/course/createCourseDTO';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import createCourseUseCase from 'src/Domain/usecase/common/course/createCourseuseCase';
import { uploadVideoDTO } from '../DTO/video/uploadvideoDTO';
import { mongoosevideoRepository } from 'src/infrastructure/database/repositories/video/mongoosevideorepository';
import { mongooseCourseRepository } from 'src/infrastructure/database/repositories/course/mongoosecourserepository';
import Video from 'src/Domain/entity/video.entity';
export declare class CourseService {
    private readonly cloudinary;
    private readonly mongooseVideoRepository;
    private readonly mongoosecourseRepository;
    private readonly createCourseuseCase;
    constructor(cloudaniryuploaduseCase: cloudinaryUploaduseCase, createcourse: createCourseUseCase, mongoosevideoRepository: mongoosevideoRepository, mongoosecourseRepository: mongooseCourseRepository);
    createCourse(courseData: createCourseDTO): Promise<import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/course.entity").default> & import("../../../../Domain/entity/course.entity").default & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    getVideodata(videoId: string): Promise<import("mongoose").Document<unknown, {}, Video> & Video & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    addVideo(videoData: uploadVideoDTO): Promise<{
        success: boolean;
        message: string;
        videoDBdata: Video;
    }>;
    findCourseByPublisherId(tutorId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/course.entity").default> & import("../../../../Domain/entity/course.entity").default & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
    findCourseById(CourseId: string): Promise<import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/course.entity").default> & import("../../../../Domain/entity/course.entity").default & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    getAllCourse(): Promise<(import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/course.entity").default> & import("../../../../Domain/entity/course.entity").default & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
}
