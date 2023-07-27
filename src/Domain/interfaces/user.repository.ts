
import { ObjectId } from 'mongoose';
import User from '../entity/user.entity';
import { LoginDto } from 'src/infrastructure/core/user/DTO/login.dto';
interface UserRepository {
    createUser(user: User): Promise<User>
    findUserByEmail(email: string): Promise<User | null>
    addExpiryOTP(id: ObjectId, OTP: number): void
    findUserById(id: string): Promise<User>
    SetAsVerified(id: string): Promise<User>
    removeUser(id: ObjectId): void
    UpdatePassword(data: LoginDto): Promise<User>
    
}

export default UserRepository;