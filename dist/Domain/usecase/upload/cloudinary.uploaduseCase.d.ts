/// <reference types="multer" />
declare class cloudinaryUploaduseCase {
    execute(imageData: Express.Multer.File): Promise<string>;
}
export default cloudinaryUploaduseCase;
