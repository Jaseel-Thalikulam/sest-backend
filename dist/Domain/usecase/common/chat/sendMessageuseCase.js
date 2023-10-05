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
const common_1 = require("@nestjs/common");
const mongooseMessageRespository_1 = require("../../../../infrastructure/database/repositories/messages/mongooseMessageRespository");
const mongooseChatRepository_1 = require("../../../../infrastructure/database/repositories/chat/mongooseChatRepository");
let sendMessageuseCase = class sendMessageuseCase {
    constructor(messageRepository, mongooseChatRepository) {
        this._messageRepository = messageRepository;
        this._mongooseChatRepository = mongooseChatRepository;
    }
    async execute(data) {
        try {
            const response = await this._messageRepository.sendMessage(data);
            await this._mongooseChatRepository.UpdateLatestMessage(response._id, data.ChatId);
            return {
                success: true,
                message: 'succefully send',
            };
        }
        catch (err) {
            return { success: false, message: 'Server Error' };
        }
    }
};
sendMessageuseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseMessageRespository_1.mongooseMessageRepository,
        mongooseChatRepository_1.mongooseChatRepository])
], sendMessageuseCase);
exports.default = sendMessageuseCase;
//# sourceMappingURL=sendMessageuseCase.js.map