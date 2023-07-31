
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './cloudinary.constants'

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (config: ConfigService) => {
    return v2.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
  },
  inject: [ConfigService],
};


// const cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//     cloud_name: 'dan9hatpk', 
//     api_key: '771294636423861', 
//     api_secret: 'xxAiY60wy1ocr8oQhZxhaDNIu9k',
//     secure: true
// });
  

// module.exports = cloudinary;