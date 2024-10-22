import { IsEmail, IsString, MinLength , IsEnum} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user.entity';

export class CreateUserDto {

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: true
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address of the user',
    required: true
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the user account',
    required: true,
    minLength: 6
  })
  @IsString()
  @MinLength(6)
  password: string;
  
  @ApiProperty({
    enum: UserRole,
    description: 'Role of the user',
    required: false,
  })
  @IsEnum(UserRole)
  role?: UserRole;

}
