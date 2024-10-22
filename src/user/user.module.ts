import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity'; // فرض کنید entity به این شکل است.

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ثبت مخزن
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

