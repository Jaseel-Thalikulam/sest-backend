import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import IChatRepository from 'src/Domain/interfaces/chat.interface';
import { accessChatDto } from 'src/infrastructure/core/common/DTO/chat/creatChatDTO';
import Chat from 'src/Domain/entity/chat.entity';
import ICreateChat from 'src/Domain/interfaces/creacteChat.interface';
import { fetchChatsDto } from 'src/infrastructure/core/common/DTO/chat/fetchChatsDto';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import { ConsoleLogger } from '@nestjs/common';
export class mongooseChatRepository implements IChatRepository {
  constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>) {}

  async createChat(data: accessChatDto): Promise<ICreateChat> {
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
    } catch (err) {
      return { success: false, message: 'Server Error' };
    }
  }

  async findChat(data: accessChatDto) {
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

    return response;
  }

  async fetchAllChats(data: fetchChatsDto) {
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
        const otherUsers = chat.users.filter(
          (user) => user._id.toString() !== Id.toString(),
        );
        return {
          ...chat.toObject(),
          users: otherUsers,
        };
      });

      return { success: true, message: 'Chats Fetched', Chats: filteredChats };
    } catch (err) {
      return { success: false, message: 'Server Error' };
    }
  }

  async isSenderExist(data: SendMessageDTO) {
    const chat = await this.chatModel.findOne({
      users: data.SenderId,
    });

    return !!chat;
  }

  async UpdateLatestMessage(messageId: ObjectId, ChatId: string) {
    try {
      const response = await this.chatModel.findByIdAndUpdate(
        ChatId,
        { latestMessage: messageId },
        { new: true }, // Return the updated document
      );

      // console.log(response, 'Chat repo');
    } catch (err) {
      console.log(err, 'chat repo');
    }
  }
}
