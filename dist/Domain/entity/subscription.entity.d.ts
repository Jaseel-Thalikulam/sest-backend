import { ObjectId } from 'mongoose';
declare class Subscription {
    _id: ObjectId;
    Name: string;
    TutorID: string;
    StudentID: string;
    IsLifeTime: boolean;
    SubscribedTime: Date;
    Expirytime: Date;
    constructor(Name: string, TutorID: string, StudentID: string, IsLifeTime: boolean, SubscribedTime: Date, Expirytime: Date);
}
export default Subscription;
