import { IUploadReturn } from './updatedUrl.interface';

interface IUploadRepository {
  updateAvatarUrl(userId: string, avatarUrl: string): Promise<IUploadReturn>;
}

export default IUploadRepository;
