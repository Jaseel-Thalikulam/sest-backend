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
exports.mongooseChatRepository = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let mongooseChatRepository = exports.mongooseChatRepository = class mongooseChatRepository {
    constructor(chatModel) {
        this.chatModel = chatModel;
    }
    async createChat(data) {
        try {
            const { receiverId, senderId } = data;
            const chatData = {
                users: [receiverId, senderId],
                isGroupChat: false,
            };
            const newChat = await this.chatModel.create(chatData);
            const Chatdetail = await newChat.populate({
                path: 'users',
                model: 'User',
            });
            return { success: true, message: 'New Chat Created', Chat: Chatdetail };
        }
        catch (err) {
            return { success: false, message: 'Server Error' };
        }
    }
    async findChat(data) {
        const response = await this.chatModel
            .findOne({
            isGroupChat: false,
            users: {
                $all: [data.receiverId, data.senderId],
            },
        })
            .populate({
            path: 'users',
            model: 'User',
        });
        if (response) {
            const userIndex = response.users.findIndex((user) => user._id == data.senderId);
            if (userIndex !== -1) {
                response.users.splice(userIndex, 1);
            }
        }
        return response;
    }
    async fetchAllChats(data) {
        try {
            const Id = data.userId;
            const Chats = await this.chatModel
                .find({ users: { $in: [Id] } })
                .populate({
                path: 'users',
                model: 'User',
            })
                .populate({
                path: 'latestMessage',
                model: 'Message',
            })
                .populate({
                path: 'groupAdmin',
                model: 'User',
            });
            const filteredChats = Chats.map((chat) => {
                const otherUsers = chat.users.filter((user) => user._id.toString() !== Id.toString());
                return {
                    ...chat.toObject(),
                    users: otherUsers,
                };
            });
            return { success: true, message: 'Chats Fetched', Chats: filteredChats };
        }
        catch (err) {
            return { success: false, message: 'Server Error' };
        }
    }
    async isSenderExist(data) {
        const chat = await this.chatModel.findOne({
            users: data.SenderId,
        });
        return !!chat;
    }
    async UpdateLatestMessage(messageId, ChatId) {
        try {
            const response = await this.chatModel.findByIdAndUpdate(ChatId, { latestMessage: messageId }, { new: true });
        }
        catch (err) {
            console.log(err, 'chat repo');
        }
    }
};
exports.mongooseChatRepository = mongooseChatRepository = __decorate([
    __param(0, (0, mongoose_2.InjectModel)('Chat')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], mongooseChatRepository);
//# sourceMappingURL=mongooseChatRepository.js.map