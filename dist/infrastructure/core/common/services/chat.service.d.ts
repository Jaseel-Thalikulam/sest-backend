/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import createChatuseCase from 'src/Domain/usecase/common/chat/createChatuseCase';
import { accessChatDto } from '../DTO/chat/creatChatDTO';
import { mongooseChatRepository } from 'src/infrastructure/database/repositories/chat/mongooseChatRepository';
import { fetchChatsDto } from '../DTO/chat/fetchChatsDto';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import sendMessageuseCase from 'src/Domain/usecase/common/chat/sendMessageuseCase';
import { mongooseMessageRepository } from 'src/infrastructure/database/repositories/messages/mongooseMessageRespository';
export declare class ChatService {
    private readonly _createChatuseCase;
    private readonly _sendMessageuseCase;
    private readonly _mongooseChatRepository;
    private readonly _mongooseMessageRepository;
    constructor(createChatuseCase: createChatuseCase, sendMessageuseCase: sendMessageuseCase, mongooseChatRepository: mongooseChatRepository, mongooseMessageRepository: mongooseMessageRepository);
    accessChat(data: accessChatDto): Promise<{
        success: boolean;
        message: string;
        Chat: import("../../../../Domain/interfaces/Ichat").IChat;
    } | {
        success: boolean;
        message: string;
        Chat?: undefined;
    }>;
    fetchChats(data: fetchChatsDto): Promise<{
        success: boolean;
        message: string;
        Chats: {
            users: import("../../../../Domain/entity/user.entity").default[];
            _id: import("mongoose").Schema.Types.ObjectId;
            Name: string;
            isGroupChat: boolean;
            latestMessage: import("mongoose").Schema.Types.ObjectId;
            groupAdmin: import("mongoose").Schema.Types.ObjectId;
        }[];
    } | {
        success: boolean;
        message: string;
        Chats?: undefined;
    }>;
    sendMessage(data: SendMessageDTO): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message: string;
        Chat: any;
        sender: any;
    }>;
    fetchMessages(ChatId: string): Promise<(import("mongoose").Document<unknown, {}, import("../../../../Domain/entity/message.entity").default> & import("../../../../Domain/entity/message.entity").default & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
}
