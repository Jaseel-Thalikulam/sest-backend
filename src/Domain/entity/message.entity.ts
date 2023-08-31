import { ObjectId } from 'mongoose';
import User from './user.entity';
import Chat from './chat.entity';

class Message {
  public _id!: ObjectId;
  public chat: Chat | ObjectId;
  public content: string;
  public sender: User | ObjectId;
  public timeStamp: string;

  constructor(
    chat: Chat | ObjectId,
    content: string,
    sender: User | ObjectId,
    timeStamp: string,
  ) {
    this.chat = chat;
    this.sender = sender;
    this.content = content;
    this.timeStamp = timeStamp;
  }
}

export default Message;
