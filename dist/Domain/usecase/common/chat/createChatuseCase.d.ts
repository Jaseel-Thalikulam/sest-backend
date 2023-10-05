import { accessChatDto } from '../../../../infrastructure/core/common/DTO/chat/creatChatDTO';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
declare class createChatuseCase {
    private chatRepository;
    constructor(chatRepository: mongooseChatRepository);
    execute(data: accessChatDto): Promise<{
        success: boolean;
        message: string;
        Chat: import("../../../interfaces/Ichat").IChat;
    } | {
        success: boolean;
        message: string;
        Chat?: undefined;
    }>;
}
export default createChatuseCase;
