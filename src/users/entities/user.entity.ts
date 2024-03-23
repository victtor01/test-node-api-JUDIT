import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { randomUUID } from 'crypto';
export class User {
  @IsString()
  public readonly id: string;
  @IsString()
  public name: string
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
  @IsDateString()
  createdAt: Date = new Date();
  @IsDateString()
  updatedAt: Date = new Date();
  
  status: UserStatus = 'CREATED';
  
  constructor(data: CreateUserDto, id?: string) {
    Object.assign(this, data);
    this.id = id || randomUUID();
  }
}

export type UserStatus = 'CREATED' | 'DISABLED' | 'ACTIVATED';