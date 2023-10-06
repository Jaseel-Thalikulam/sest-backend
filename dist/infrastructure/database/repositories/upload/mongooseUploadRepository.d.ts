import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import IUploadRepository from 'src/Domain/interfaces/upload.interface';
import { IUploadReturn } from 'src/Domain/interfaces/updatedUrl.interface';
export declare class mongooseUploadRepository implements IUploadRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    updateAvatarUrl(userID: string, avatarUrl: string): Promise<IUploadReturn>;
}
