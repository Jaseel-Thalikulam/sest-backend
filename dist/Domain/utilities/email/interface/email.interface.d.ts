import { ObjectId } from 'mongoose';
interface IemailService {
    SendEmailOTP(email: string, userId: ObjectId | string): void;
}
export default IemailService;
