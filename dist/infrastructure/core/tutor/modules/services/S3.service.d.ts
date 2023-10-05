/// <reference types="node" />
import S3useCase from 'src/Domain/usecase/tutor/S3UploaduseCase';
import S3GenerateSignedURLuseCase from 'src/Domain/usecase/tutor/S3GenerateSignedUrluseCase';
export declare class S3Service {
    private readonly _S3UploaduseCase;
    private readonly _S3GenerateSignedURLuseCase;
    constructor(S3useCase: S3useCase, S3GenerateSignedURLuseCase: S3GenerateSignedURLuseCase);
    upload(fileName: string, file: Buffer): Promise<string>;
    getSignedUrl(URL: string): Promise<string>;
}
