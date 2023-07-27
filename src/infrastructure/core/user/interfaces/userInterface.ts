import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: number;
  readonly role: string;
  password: string;
  isVerified: boolean;
  isBanned: boolean;
  otp: {
    code: string;
    expiresAt: Date;
  };
}
