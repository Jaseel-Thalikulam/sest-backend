import { Post, UploadedFile, UseInterceptors, Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
const UPLOAD_DIR = './upload/files/';

@ApiTags('Uploading Files')
@Controller('upload')
@ApiConsumes('multipart/form-data')
export class FileController {
    @Post('profilepicture')
    @UseInterceptors(FileInterceptor('file', { dest: UPLOAD_DIR }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }
}
