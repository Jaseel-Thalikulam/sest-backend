"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongooseChatRepository_1 = require("../../../infrastructure/database/repositories/chat/mongooseChatRepository");
const createChatuseCase_1 = require("../../usecase/common/chat/createChatuseCase");
const Chat_1 = require("../../../infrastructure/database/schema/Chat");
const sendMessageuseCase_1 = require("../../usecase/common/chat/sendMessageuseCase");
const mongooseMessageRespository_1 = require("../../../infrastructure/database/repositories/messages/mongooseMessageRespository");
const Message_1 = require("../../../infrastructure/database/schema/Message");
const chat_service_1 = require("../../../infrastructure/core/common/services/chat.service");
const chat_gateway_1 = require("./gateway/chat.gateway");
let ChatModule = exports.ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Chat',
                    schema: Chat_1.chatSchema,
                },
            ]),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Message',
                    schema: Message_1.messageSchema,
                },
            ]),
        ],
        controllers: [],
        providers: [
            chat_service_1.ChatService,
            chat_gateway_1.ChatGateway,
            mongooseChatRepository_1.mongooseChatRepository,
            mongooseMessageRespository_1.mongooseMessageRepository,
            createChatuseCase_1.default,
            sendMessageuseCase_1.default,
        ],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map