import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import { FetchAllMessageDTO } from 'src/infrastructure/core/student/DTO/FetchAllMessageDTO';
import Message from 'src/Domain/entity/message.entity';

export interface IMessage {
  sendMessage(data: SendMessageDTO): Promise<Message>;
  fetchallMessages(chatId: string): Promise<Message[] | null>;
}
