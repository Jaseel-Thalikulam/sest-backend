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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { ICourse } from 'src/Domain/interfaces/ICourse';
import Course from 'src/Domain/entity/course.entity';
import { createCourseDTO } from 'src/infrastructure/core/common/DTO/course/createCourseDTO';
import Video from 'src/Domain/entity/video.entity';
export declare class mongooseCourseRepository implements ICourse {
    private readonly courseModel;
    constructor(courseModel: Model<Course>);
    createCourse(courseData: createCourseDTO): Promise<import("mongoose").Document<unknown, {}, Course> & Course & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    addVideo(videoDBdata: Video): Promise<void>;
    isTutorAuthorised(userId: string, courseId: string): Promise<boolean>;
    findCourseByPublisherId(tutorId: string): Promise<(import("mongoose").Document<unknown, {}, Course> & Course & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
    findCourseById(CourseId: string): Promise<import("mongoose").Document<unknown, {}, Course> & Course & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    findAllCourse(): Promise<(import("mongoose").Document<unknown, {}, Course> & Course & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
}
