import { Injectable } from '@nestjs/common';
import S3useCase from 'src/Domain/usecase/tutor/S3UploaduseCase';
import S3GenerateSignedURLuseCase from 'src/Domain/usecase/tutor/S3GenerateSignedUrluseCase';
@Injectable()
export class S3Service {
  private readonly _S3UploaduseCase: S3useCase;
  private readonly _S3GenerateSignedURLuseCase: S3GenerateSignedURLuseCase;

  constructor(S3useCase: S3useCase,S3GenerateSignedURLuseCase:S3GenerateSignedURLuseCase){
    this._S3UploaduseCase = S3useCase;
    this._S3GenerateSignedURLuseCase = S3GenerateSignedURLuseCase;
  }

  public async upload(fileName: string, file: Buffer) {
    await this._S3UploaduseCase.execute(fileName, file);
  }

  public async getSignedUrl() {
  await this._S3GenerateSignedURLuseCase.execute()
}


}
