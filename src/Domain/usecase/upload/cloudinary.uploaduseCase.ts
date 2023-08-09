import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';


const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

@Injectable()
class cloudinaryUploaduseCase {
  async execute(imageData:Express.Multer.File): Promise<string> {
    console.log(imageData, "imageee from usecase");
    const imageBuffer = imageData.buffer;

    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          public_id: imageData.originalname,
        },
        (error, result) => {
          if (error) { 
           reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(imageBuffer);
    });
  }
}

export default cloudinaryUploaduseCase;
