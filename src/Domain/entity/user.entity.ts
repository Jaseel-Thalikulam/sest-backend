import { ObjectId } from 'mongoose';

class User {
  public _id!: ObjectId;
  private name: string;
  public email: string;
  public password: string;
  public role: string;
  public isVerified!: boolean;
  public isBanned!: boolean;
  public phoneNumber?: string;
  public about?: string;
  public DOB: Date;
  public otp?: {
    code: string;
    expiresAt: Date;
  };
  public URLs: {
    github?: string;
    linkedin?: string;
    pinterest?: string;
    twitter?: string;
  };
  public tags: string[]; // Array of tags

  constructor(
    name: string,
    email: string,
    password: string,
    role: string,
    phoneNumber?: string,
    about?: string,
    otp?: { code: string; expiresAt: Date },
    URLs?: { github?: string; linkedin?: string; pinterest?: string },
    DOB?: Date,
    tags: string[] = [] // Default empty array for tags
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.about = about;
    this.otp = otp;
    this.URLs = URLs;
    this.DOB = DOB;
    this.isBanned = false;
    this.isVerified = false;
    this.tags = tags;
  }

  // ... (rest of the methods)

  getTags(): string[] {
    return this.tags;
  }

  addTag(tag: string): void {
    this.tags.push(tag);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }
}

export default User;
