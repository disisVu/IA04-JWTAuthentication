import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @Length(3)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserProfileDto {
  username: string;
  email: string;
  createdAt: Date;

  constructor() {
    this.username = '';
    this.email = '';
    this.createdAt = new Date();
  }
}
