export class RegisterDto {
  readonly name: string;
  readonly email: string;
  readonly phoneNumber: number;
  readonly password: string;
  readonly isVerified: boolean;
  readonly isBanned: boolean;
  readonly role: string;
}
