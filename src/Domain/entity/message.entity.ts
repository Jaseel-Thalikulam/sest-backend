import { ObjectId } from 'mongoose';
import User from './user.entity';
import Chat from './chat.entity';

class Message {
  public _id!: ObjectId;
  public chat: Chat | ObjectId;
  public content: string;
  public sender: User | ObjectId;

  constructor(chat: Chat| ObjectId, content: string, sender: User| ObjectId) {
    this.chat = chat;
    this.sender = sender;
    this.content = content;
  }
}

export default Message;
