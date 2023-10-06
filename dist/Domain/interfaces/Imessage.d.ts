import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import Message from 'src/Domain/entity/message.entity';
export interface IMessage {
    sendMessage(data: SendMessageDTO): Promise<Message>;
    fetchallMessages(chatId: string): Promise<Message[] | null>;
}
