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
const mongooseChatRepository_1 = require("../../../../infrastructure/database/repositories/chat/mongooseChatRepository");
let createChatuseCase = class createChatuseCase {
    constructor(chatRepository) {
        this.chatRepository = chatRepository;
    }
    async execute(data) {
        try {
            const response = await this.chatRepository.createChat(data);
            const userIndex = response.Chat.users.findIndex((user) => user._id == data.senderId);
            if (userIndex !== -1) {
                response.Chat.users.splice(userIndex, 1);
            }
            console.log(response.Chat, 'chataa');
            return {
                success: response.success,
                message: response.message,
                Chat: response.Chat,
            };
        }
        catch (err) {
            return { success: false, message: 'Server Error' };
        }
    }
};
createChatuseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseChatRepository_1.mongooseChatRepository])
], createChatuseCase);
exports.default = createChatuseCase;
//# sourceMappingURL=createChatuseCase.js.map