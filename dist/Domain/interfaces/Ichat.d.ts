import { ObjectId } from 'mongoose';
import User from '../entity/user.entity';
export interface IChat {
    Name: string;
    isGroupChat: boolean;
    users: User[];
    groupAdmin: ObjectId;
}
