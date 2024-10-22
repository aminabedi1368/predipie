import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserRole } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Error validating user:', error);
      throw new Error('Failed to validate user');
    }
  }

  async login(user: any) {
    try {
      const payload: JwtPayload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Failed to login');
    }
  }

  async register(userDto: CreateUserDto, role: UserRole = UserRole.PARTICIPANT) {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 10);
      return await this.userService.create({ ...userDto, password: hashedPassword, role });
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Failed to register user');
    }
  }
}
