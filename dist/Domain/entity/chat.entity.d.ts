import { ObjectId } from 'mongoose';
import User from './user.entity';
declare class Chat {
    _id: ObjectId;
    Name: string;
    isGroupChat: boolean;
    users: User[];
    latestMessage: ObjectId;
    groupAdmin: ObjectId;
    constructor(Name: string, isGroupChat: boolean, users: User[], latestMessage: ObjectId, groupAdmin: ObjectId);
}
export default Chat;
