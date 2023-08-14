import { Injectable } from '@nestjs/common';
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import { createChatDto } from '../../DTO/creatChatDTO';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';

@Injectable()
export class ChatService {
  private readonly _createChatuseCase: createChatuseCase;
  private readonly _mongooseChatRepository: mongooseChatRepository;

  constructor(
    createChatuseCase: createChatuseCase,
    mongooseChatRepository:mongooseChatRepository) {
    this._createChatuseCase = createChatuseCase;
    this._mongooseChatRepository =mongooseChatRepository
  }
  public async createChat(data: createChatDto) {
    try {
      // const isChatExist = this._mongooseChatRepository.
      this._createChatuseCase.execute(data);

      return;
    } catch (err) {
      console.log(err);
    }
  }
}
