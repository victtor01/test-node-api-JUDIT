import { IsEmail, IsString } from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  status?: UserStatus;
}
