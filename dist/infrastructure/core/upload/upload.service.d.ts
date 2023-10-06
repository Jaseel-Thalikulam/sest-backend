/// <reference types="multer" />
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { mongooseUploadRepository } from 'src/infrastructure/database/repositories/upload/mongooseUploadRepository';
export declare class upload_Service {
    private readonly _cloudinaryUploaduseCase;
    private readonly _mongooseUploadRepository;
    constructor(cloudinaryUploaduseCase: cloudinaryUploaduseCase, mongooseUploadRepository: mongooseUploadRepository);
    upload_avatar(imageData: Express.Multer.File, userId: string): Promise<import("../../../Domain/interfaces/updatedUrl.interface").IUploadReturn>;
    uploadThumbnail(imageData: Express.Multer.File): Promise<{
        success: boolean;
        ThumbnailURL: string;
    } | {
        success: boolean;
        ThumbnailURL: string;
        message: string;
    }>;
}
