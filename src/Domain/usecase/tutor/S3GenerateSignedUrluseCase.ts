import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
@Injectable()
class S3GenerateSignedURLuseCase {

  constructor(private readonly configService: ConfigService) {}

  async execute() {
  
    return getSignedUrl({
       

          url: this.configService.getOrThrow('AWS_CLOUD_FRONT') + 'video (2160p).mp4',
          dateLessThan: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          privateKey:this.configService.getOrThrow('CLOUDFRONT_PRIVATE_KEY'),
          keyPairId:this.configService.getOrThrow('CLOUD_FRONT_KEY_PAIR_ID')
   

     })
      
      
     
      
    }
    

  
}

export default S3GenerateSignedURLuseCase;
