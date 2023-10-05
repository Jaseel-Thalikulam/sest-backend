import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
declare class sendMessageuseCase {
    private _messageRepository;
    private _mongooseChatRepository;
    constructor(messageRepository: mongooseMessageRepository, mongooseChatRepository: mongooseChatRepository);
    execute(data: SendMessageDTO): Promise<{
        success: boolean;
        message: string;
    }>;
}
export default sendMessageuseCase;
