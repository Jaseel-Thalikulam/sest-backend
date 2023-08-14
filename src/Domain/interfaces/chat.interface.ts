import { createChatDto } from 'src/infrastructure/core/common/DTO/creatChatDTO';


interface IChatRepository {
  createChat(data:createChatDto):Promise<boolean>
}

export default IChatRepository;
