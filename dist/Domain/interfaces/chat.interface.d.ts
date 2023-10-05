import { accessChatDto } from 'src/infrastructure/core/common/DTO/chat/creatChatDTO';
import { fetchChatsDto } from 'src/infrastructure/core/common/DTO/chat/fetchChatsDto';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import ICreateChat from './creacteChat.interface';
import { ObjectId } from 'mongoose';
interface IChatRepository {
    createChat(data: accessChatDto): Promise<ICreateChat>;
    findChat(data: accessChatDto): Promise<any>;
    fetchAllChats(data: fetchChatsDto): Promise<any>;
    isSenderExist(data: SendMessageDTO): Promise<boolean>;
    UpdateLatestMessage(messageId: ObjectId, ChatId: string): Promise<void>;
}
export default IChatRepository;
