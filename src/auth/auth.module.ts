import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';  // اضافه کردن کنترلر

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'fhvkdhskdlshbhsjhchvg', // این را به یک کلید مخفی امن تغییر دهید
      signOptions: { expiresIn: '6000s' }, // مدت اعتبار توکن
    }),
    UserModule,
  ],
  controllers: [AuthController],  // اضافه کردن کنترلر
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

