/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
declare class S3UploaduseCase {
    private readonly configService;
    private readonly s3Client;
    constructor(configService: ConfigService);
    execute(fileName: string, file: Buffer): Promise<string>;
    generateRandomString(length: number): Promise<string>;
}
export default S3UploaduseCase;
