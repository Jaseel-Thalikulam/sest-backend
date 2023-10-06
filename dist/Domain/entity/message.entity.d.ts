import { ObjectId } from 'mongoose';
import User from './user.entity';
import Chat from './chat.entity';
declare class Message {
    _id: ObjectId;
    chat: Chat | ObjectId;
    content: string;
    sender: User | ObjectId;
    timeStamp: string;
    constructor(chat: Chat | ObjectId, content: string, sender: User | ObjectId, timeStamp: string);
}
export default Message;
