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

      const userIndex = response.Chat.users.findIndex(
        (user) => user._id == data.senderId,
      );

      // If the user exists, remove them from the array.
      if (userIndex !== -1) {
        response.Chat.users.splice(userIndex, 1);
      }

      console.log(response.Chat, 'chataa');

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
