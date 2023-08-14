import { ObjectId } from 'mongoose';

class Chat {
  public _id!: ObjectId;
  public Name: string;
  public isGroupChat: boolean;
  public users: ObjectId[];
  public latestMessage: ObjectId;
  public groupAdmin: ObjectId;

  constructor(
    Name: string,
    isGroupChat: boolean,
    users: ObjectId[],
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
