import { ObjectId } from 'mongoose';

export class accessChatDto {
  senderId: ObjectId;
  receiverId: ObjectId;
}
