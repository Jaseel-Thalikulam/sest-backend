import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { ChatService } from 'src/infrastructure/core/common/services/chat.service';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
export declare class ChatGateway implements OnModuleInit {
    private chatService;
    constructor(chatService: ChatService);
    server: Server;
    onModuleInit(): void;
    handleMessage(data: SendMessageDTO): Promise<void>;
}
