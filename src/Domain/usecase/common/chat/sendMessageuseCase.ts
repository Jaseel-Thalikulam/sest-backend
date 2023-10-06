import { Injectable } from '@nestjs/common';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
@Injectable()
class sendMessageuseCase {
  private _messageRepository: mongooseMessageRepository;
  private _mongooseChatRepository: mongooseChatRepository;

  constructor(
    messageRepository: mongooseMessageRepository,
    mongooseChatRepository: mongooseChatRepository,
  ) {
    this._messageRepository = messageRepository;
    this._mongooseChatRepository = mongooseChatRepository;
  }

  async execute(data: SendMessageDTO) {
    try {
      const response = await this._messageRepository.sendMessage(data);
      await this._mongooseChatRepository.UpdateLatestMessage(
        response._id,
        data.ChatId,
      );
      console.log(response, 'newwwwwchat');
      return {
        success: true,
        message: 'succefully send',
        // sender: response.sender[0]._id,
        // Chat: response.chat,
      };
    } catch (err) {
      return { success: false, message: 'Server Error' };
    }
  }
}

export default sendMessageuseCase;
