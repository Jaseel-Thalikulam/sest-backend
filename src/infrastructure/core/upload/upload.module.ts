import { UserSchema } from '../../database/schema/User';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { upload_Controller } from './upload.controller';
import { upload_Service } from './upload.service';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import { mongooseUploadRepository } from 'src/infrastructure/database/repositories/upload/mongooseUploadRepository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [upload_Controller],
  providers: [
    upload_Service,
    cloudinaryUploaduseCase,
    mongooseUploadRepository,
  ],
})
export class uploadModule {}
