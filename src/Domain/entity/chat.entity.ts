import { ObjectId } from 'mongoose';
import User from './user.entity';

class Chat {
  public _id!: ObjectId;
  public Name: string;
  public isGroupChat: boolean;
  public users: User[];
  public latestMessage: ObjectId;
  public groupAdmin: ObjectId;

  constructor(
    Name: string,
    isGroupChat: boolean,
    users: User[],
    latestMessage: ObjectId,
    groupAdmin: ObjectId,
  ) {
    this.Name = Name;
    this.isGroupChat = isGroupChat;
    (this.users = users),
      (this.latestMessage = latestMessage),
      (this.groupAdmin = groupAdmin);
  }
}

export default Chat;
