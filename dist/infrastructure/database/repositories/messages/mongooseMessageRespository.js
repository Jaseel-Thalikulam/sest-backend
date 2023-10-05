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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseMessageRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseMessageRepository = exports.mongooseMessageRepository = class mongooseMessageRepository {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async sendMessage(data) {
        const { ChatId, Content, SenderId, timeStamp } = data;
        const newmessage = {
            sender: SenderId,
            content: Content,
            chat: ChatId,
            timeStamp: timeStamp,
        };
        const createdMessage = await this.messageModel.create(newmessage);
        const populatedMessage = await this.messageModel
            .findById(createdMessage._id)
            .populate({
            path: 'sender',
            model: 'User',
        })
            .populate({
            path: 'chat',
            model: 'Chat',
        });
        return populatedMessage;
    }
    async fetchallMessages(chatId) {
        try {
            if (chatId) {
                return this.messageModel.find({ chat: chatId });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.mongooseMessageRepository = mongooseMessageRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongooseMessageRepository);
//# sourceMappingURL=mongooseMessageRespository.js.map