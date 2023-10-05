import { ConfigService } from '@nestjs/config';
declare class S3GenerateSignedURLuseCase {
    private readonly configService;
    constructor(configService: ConfigService);
    execute(URL: string): Promise<string>;
}
export default S3GenerateSignedURLuseCase;
