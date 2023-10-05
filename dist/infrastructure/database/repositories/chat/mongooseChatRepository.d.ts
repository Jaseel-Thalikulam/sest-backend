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
/// <reference types="mongoose/types/inferschematype" />
import { Model, ObjectId } from 'mongoose';
import IChatRepository from 'src/Domain/interfaces/chat.interface';
import { accessChatDto } from 'src/infrastructure/core/common/DTO/chat/creatChatDTO';
import Chat from 'src/Domain/entity/chat.entity';
import ICreateChat from 'src/Domain/interfaces/creacteChat.interface';
import { fetchChatsDto } from 'src/infrastructure/core/common/DTO/chat/fetchChatsDto';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
export declare class mongooseChatRepository implements IChatRepository {
    private readonly chatModel;
    constructor(chatModel: Model<Chat>);
    createChat(data: accessChatDto): Promise<ICreateChat>;
    findChat(data: accessChatDto): Promise<import("mongoose").Document<unknown, {}, Chat> & Chat & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    fetchAllChats(data: fetchChatsDto): Promise<{
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
    isSenderExist(data: SendMessageDTO): Promise<boolean>;
    UpdateLatestMessage(messageId: ObjectId, ChatId: string): Promise<void>;
}
