import { ObjectId } from 'mongoose';
import User from '../entity/user.entity';
import { LoginDto } from 'src/infrastructure/core/common/DTO/login.dto';
import { ProfileDto } from 'src/infrastructure/core/common/DTO/tutorProfileDTO';
import { searchQueryDTO } from 'src/infrastructure/core/common/DTO/search/searchQuerydto';
interface IUserRepository {
    createUser(user: User): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    addExpiryOTP(id: ObjectId, OTP: number): Promise<void>;
    findUserById(id: string): Promise<User | null>;
    SetAsVerified(id: string): Promise<User | null>;
    removeUser(id: ObjectId): Promise<void>;
    UpdatePassword(data: LoginDto): Promise<User | null>;
    UpdateProfile(data: ProfileDto): Promise<{
        success: boolean;
        message: string;
        userData?: User;
    }>;
    getUserByUsername(username: string): Promise<boolean>;
    findTutorsByUserId(data: searchQueryDTO): Promise<User[]>;
    findStudentsByUserId(data: searchQueryDTO): Promise<User[]>;
}
export default IUserRepository;
