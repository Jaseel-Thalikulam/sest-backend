import { Injectable } from '@nestjs/common';
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import { accessChatDto } from '../../DTO/chat/creatChatDTO';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
import { fetchChatsDto } from '../../DTO/chat/fetchChatsDto';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import sendMessageuseCase from 'src/Domain/usecase/common/chat/sendMessageuseCase';
import { FetchAllMessageDTO } from 'src/infrastructure/core/student/DTO/FetchAllMessageDTO';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
@Injectable()
export class ChatService {
  private readonly _createChatuseCase: createChatuseCase;
  private readonly _sendMessageuseCase: sendMessageuseCase;
  private readonly _mongooseChatRepository: mongooseChatRepository;
  private readonly _mongooseMessageRepository: mongooseMessageRepository;

  constructor(
    createChatuseCase: createChatuseCase,
    sendMessageuseCase: sendMessageuseCase,
    mongooseChatRepository: mongooseChatRepository,
    mongooseMessageRepository: mongooseMessageRepository,
  ) {
    this._createChatuseCase = createChatuseCase;
    this._sendMessageuseCase = sendMessageuseCase;
    this._mongooseChatRepository = mongooseChatRepository;
    this._mongooseMessageRepository = mongooseMessageRepository
  }
  public async accessChat(data: accessChatDto) {
    try {
      const Chat = await this._mongooseChatRepository.findChat(data)
      if (Chat) {
        
        return { success: true, message: "Chat exist", Chat }
        
      } else {
        
        const response = await this._createChatuseCase.execute(data);
        
          
          return { success: response.success, message: response.message, Chat:response.Chat }
      
          
      }

     
    } catch (err) {
      console.log(err);
      return { success: false, message: "Server Error"}
    }
  }

  public async fetchChats(data: fetchChatsDto) {
    try {
      
      return await this._mongooseChatRepository.fetchAllChats(data)

    } catch (err) {
      return {success:false,message:"internal error occured"}
    }
  }

  public async sendMessage(data: SendMessageDTO) {
    if (!data.ChatId || !data.Content || !data.SenderId) {
      return {success:false,message:"Cannot fullfill the request"}
    } else {
      const isSenderExistinChat = await this._mongooseChatRepository.isSenderExist(data)
      if (isSenderExistinChat) {
        
         return await this._sendMessageuseCase.execute(data)
      } else {
        return {success:false,message:"Invalid SenderId"}
      }
    }
  }

  public async fetchMessages(ChatId: string) {
    return this._mongooseMessageRepository.fetchallMessages(ChatId)
  }

}
