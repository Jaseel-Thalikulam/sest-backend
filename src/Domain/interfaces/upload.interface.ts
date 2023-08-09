import { userIdDTO } from 'src/infrastructure/core/upload/dto/userId.dto';
import { IUploadReturn } from './updatedUrl.interface';


interface IUploadRepository {
    updateAvatarUrl(userId: userIdDTO, avatarUrl: string) : Promise<IUploadReturn>;
   
}

export default IUploadRepository;
