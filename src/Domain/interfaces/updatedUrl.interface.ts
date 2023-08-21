import { ObjectId } from 'mongoose';

export interface IUploadReturn {
  success: boolean;
  message: string;
  userData?: IUserSlice;
}

interface IUserSlice {
  URLs: URLs;
  role?: string;
  name: string;
  username: string;
  email?: string;
  DOB?: null | Date;
  _id?: ObjectId;
  phoneNumber?: string;
  about?: string;
  isBanned?: boolean;
  tags: string[];
}

interface URLs {
  github?: string;
  linkedin?: string;
  pinterest?: string;
}

export default IUserSlice;
