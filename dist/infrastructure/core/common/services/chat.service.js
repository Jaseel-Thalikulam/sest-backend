"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const createChatuseCase_1 = require("../../../../Domain/usecase/common/chat/createChatuseCase");
const mongooseChatRepository_1 = require("../../../database/repositories/chat/mongooseChatRepository");
const sendMessageuseCase_1 = require("../../../../Domain/usecase/common/chat/sendMessageuseCase");
const mongooseMessageRespository_1 = require("../../../database/repositories/messages/mongooseMessageRespository");
let ChatService = exports.ChatService = class ChatService {
    constructor(createChatuseCase, sendMessageuseCase, mongooseChatRepository, mongooseMessageRepository) {
        this._createChatuseCase = createChatuseCase;
        this._sendMessageuseCase = sendMessageuseCase;
        this._mongooseChatRepository = mongooseChatRepository;
        this._mongooseMessageRepository = mongooseMessageRepository;
    }
    async accessChat(data) {
        try {
            const Chat = await this._mongooseChatRepository.findChat(data);
            if (Chat) {
                return { success: true, message: 'Chat exist', Chat };
            }
            else {
                const response = await this._createChatuseCase.execute(data);
                return {
                    success: response.success,
                    message: response.message,
                    Chat: response.Chat,
                };
            }
        }
        catch (err) {
            console.log(err);
            return { success: false, message: 'Server Error' };
        }
    }
    async fetchChats(data) {
        try {
            return await this._mongooseChatRepository.fetchAllChats(data);
        }
        catch (err) {
            return { success: false, message: 'internal error occured' };
        }
    }
    async sendMessage(data) {
        if (!data.ChatId || !data.Content || !data.SenderId) {
            return {
                success: false,
                message: 'Cannot fullfill the request',
                Chat: null,
                sender: null,
            };
        }
        else {
            const isSenderExistinChat = await this._mongooseChatRepository.isSenderExist(data);
            if (isSenderExistinChat) {
                return await this._sendMessageuseCase.execute(data);
            }
            else {
                return { success: false, message: 'Invalid SenderId' };
            }
        }
    }
    async fetchMessages(ChatId) {
        return this._mongooseMessageRepository.fetchallMessages(ChatId);
    }
};
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [createChatuseCase_1.default,
        sendMessageuseCase_1.default,
        mongooseChatRepository_1.mongooseChatRepository,
        mongooseMessageRespository_1.mongooseMessageRepository])
], ChatService);
//# sourceMappingURL=chat.service.js.map