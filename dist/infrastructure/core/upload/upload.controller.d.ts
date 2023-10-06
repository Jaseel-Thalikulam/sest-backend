/// <reference types="multer" />
import { upload_Service } from './upload.service';
import { Response } from 'express';
export declare class upload_Controller {
    private uploadService;
    constructor(uploadService: upload_Service);
    Upload_avatar(imageData: Express.Multer.File, userId: string, res: Response): Promise<void>;
}
