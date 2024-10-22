import { Injectable, OnModuleInit } from '@nestjs/common';
import { User , UserRole } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto'; //


@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
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
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log('Found user:', user); 
    return user;

  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUserRole(userId: number, role: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    user.role = role;
    return this.userRepository.save(user);
  }

}

