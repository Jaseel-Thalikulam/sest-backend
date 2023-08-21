import { ObjectId } from 'mongoose';

class User {
  public _id!: ObjectId;
  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public role: string;
  public isVerified: boolean;
  public isBanned!: boolean;
  public phoneNumber?: string;
  public about?: string;
  public avatarUrl?: string;
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
  public tags: string[];

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    role: string,
    isVerified: boolean,
    tags: string[] = [],
    phoneNumber?: string,
    avatarUrl?: string,
    about?: string,
    otp?: { code: string; expiresAt: Date },
    URLs?: { github?: string; linkedin?: string; pinterest?: string },
    DOB?: Date,
  ) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.avatarUrl = avatarUrl;
    this.about = about;
    this.otp = otp;
    this.URLs = URLs;
    this.DOB = DOB;
    this.isBanned = false;
    this.isVerified = isVerified;
    this.tags = tags;
  }

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
