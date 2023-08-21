import { Injectable } from '@nestjs/common';
import { accessChatDto } from '../../../../infrastructure/core/common/DTO/chat/creatChatDTO';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';

@Injectable()
class createChatuseCase {
  private chatRepository: mongooseChatRepository;

  constructor(chatRepository: mongooseChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(data: accessChatDto) {
    try {
      const response = await this.chatRepository.createChat(data);

      return {
        success: response.success,
        message: response.message,
        Chat: response.Chat,
      };
    } catch (err) {
      return { success: false, message: 'Server Error' };
    }
  }
}

export default createChatuseCase;
