
import { Injectable } from '@nestjs/common';
import { createChatDto } from '../../../../infrastructure/core/common/DTO/creatChatDTO';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';


@Injectable()
class createChatuseCase {
  private chatRepository: mongooseChatRepository;

  constructor(chatRepository: mongooseChatRepository) {
    this.chatRepository = chatRepository;
  }

  async execute(data: createChatDto) {
    
  }
}

export default createChatuseCase;
