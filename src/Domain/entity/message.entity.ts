import { ObjectId } from 'mongoose';

class Chat {
  public _id!: ObjectId;
  public chat: ObjectId;
  public content: string;
  public sender: ObjectId;

  constructor(chat: ObjectId, content: string, sender: ObjectId) {
    this.chat = chat;
    this.sender = sender;
    this.content = content;
  }
}

export default Chat;
