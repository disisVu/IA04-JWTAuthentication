import { Injectable } from '@nestjs/common';
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
      return {
        success: false,
        message: 'Username already exist.',
        data: {},
      };
    }

    // Check if email is already in use
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      return {
        success: false,
        message: 'Email already used.',
        data: {},
      };
    }

    // Hash password
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new User
    const newUser = await this.userService.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      message: 'User registered successfully.',
      data: {
        user: {
          username: newUser.username,
          email: newUser.email,
        },
      },
    };
  }

  // Log into User account
  async login(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;

    // Find User by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return {
        success: false,
        message: `User email doesn't exist.`,
        data: {},
      };
    }

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return {
        success: false,
        message: 'Wrong password.',
        data: {},
      };
    }

    // Generate JWT
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Get user info
    const {
      data: { user: userInfo },
    } = await this.getProfile(user.email);

    return {
      success: true,
      message: 'Logged in successfully.',
      data: {
        accessToken,
        userInfo,
      },
    };
  }

  async getProfile(email: string) {
    const user = await this.userService.getUserProfile(email);
    if (!user) {
      return {
        success: false,
        message: `User email doesn't exist.`,
        data: {},
      };
    }

    return {
      success: true,
      message: 'User profile fetched successfully.',
      data: {
        user: user,
      },
    };
  }
}
