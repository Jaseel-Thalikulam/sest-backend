import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import IChatRepository from 'src/Domain/interfaces/chat.interface';
import { createChatDto } from 'src/infrastructure/core/common/DTO/creatChatDTO';

export class mongooseChatRepository implements IChatRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createChat(data:createChatDto) {
    return true
    }
    
    async isChatExist(data:createChatDto) {
        
    }

}
