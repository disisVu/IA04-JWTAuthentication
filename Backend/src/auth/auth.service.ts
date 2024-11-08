import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '~/users/users.service';
import { UserLoginDto, UserRegisterDto } from '~/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Register new User account
  async register(userRegistoDto: UserRegisterDto) {
    const { username, email, password } = userRegistoDto;

    // Check if username already exists
    const existingUserName = await this.userService.findByUsername(username);
    if (existingUserName) {
      throw new BadRequestException('Username already exists.');
    }

    // Check if email is already in use
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already used.');
    }

    // Hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new User
    const newUser = await this.userService.create({
      email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully.',
      user: {
        email: newUser.email,
      },
    };
  }

  // Log into User account
  async login(userLoginDto: UserLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = userLoginDto;

    // Find User by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(`User email doesn't exist.`);
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Wrong password.');
    }

    // Generate JWT
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}
