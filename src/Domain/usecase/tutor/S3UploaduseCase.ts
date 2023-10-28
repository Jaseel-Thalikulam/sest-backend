import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
@Injectable()
class S3UploaduseCase {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });
  constructor(private readonly configService: ConfigService) {}

  async execute(fileName: string, file: Buffer) {
    const uniqueKey = (await this.generateRandomString(16)) + fileName;

    const response = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'sest-upload',
        Key: uniqueKey,
        Body: file,
      }),
    );

    const URL =
      (await this.configService.getOrThrow('AWS_CLOUD_FRONT')) + uniqueKey;
    return URL;
  }

  async generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}

export default S3UploaduseCase;
