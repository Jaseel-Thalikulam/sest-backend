import { ObjectId } from 'mongoose';
import User from '../entity/user.entity';
import { LoginDto } from 'src/infrastructure/core/common/DTO/login.dto';
import { ProfileDto } from 'src/infrastructure/core/common/DTO/tutorProfileDTO';

interface IUserRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  addExpiryOTP(id: ObjectId, OTP: number): void;
  findUserById(id: string): Promise<User>;
  SetAsVerified(id: string): Promise<User>;
  removeUser(id: ObjectId): void;
  UpdatePassword(data: LoginDto): Promise<User>;
  UpdateProfile(data: ProfileDto);
  getUserByUsername(username: string): Promise<boolean>;
}

export default IUserRepository;
