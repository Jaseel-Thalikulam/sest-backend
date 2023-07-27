
import { ObjectId } from 'mongoose';


interface emailServiceUseCase {
    SendEmailOTP(email:string,userId:ObjectId|string) :void  
}

export default emailServiceUseCase;