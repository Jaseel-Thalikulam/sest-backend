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
import { Model } from 'mongoose';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import Message from 'src/Domain/entity/message.entity';
import { IMessage } from 'src/Domain/interfaces/Imessage';
export declare class mongooseMessageRepository implements IMessage {
    private readonly messageModel;
    constructor(messageModel: Model<Message>);
    sendMessage(data: SendMessageDTO): Promise<import("mongoose").Document<unknown, {}, Message> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>>;
    fetchallMessages(chatId: string): Promise<(import("mongoose").Document<unknown, {}, Message> & Message & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }>)[]>;
}
