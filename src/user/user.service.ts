import { Injectable, OnModuleInit } from '@nestjs/common';
import { User, UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    try {
      // Create default admin if not exists
      const defaultAdminEmail = 'admin@example.com';
      const adminExists = await this.userRepository.findOne({ where: { email: defaultAdminEmail } });

      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10); // Set a default password
        const admin = this.userRepository.create({
          name: 'Default Admin',
          email: defaultAdminEmail,
          password: hashedPassword,
          role: UserRole.ADMIN, // Set role to admin
        });
        await this.userRepository.save(admin);
        console.log('Default admin created:', admin);
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
      throw new Error('Failed to initialize default admin');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        console.warn('User not found with email:', email);
        return null;
      }
      console.log('Found user:', user);
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user by email');
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        console.warn('User not found with id:', id);
        return null;
      }
      return user;
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw new Error('Failed to find user by id');
    }
  }

  async updateUserRole(userId: number, role: UserRole): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      user.role = role;
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw new Error('Failed to update user role');
    }
  }
}
