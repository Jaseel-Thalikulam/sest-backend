import { accessChatDto } from 'src/infrastructure/core/common/DTO/chat/creatChatDTO';
import ICreateChat from './creacteChat.interface';

interface IChatRepository {
  createChat(data: accessChatDto): Promise<ICreateChat>;
}

export default IChatRepository;
