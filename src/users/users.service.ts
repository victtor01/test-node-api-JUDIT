import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users-repository';
import { ListsService } from '../lists/lists.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly listService: ListsService,
  ) {}

  private saltHashPassoword = 10;

  async hashUserPassword(pass: string): Promise<string> {
    return await bcrypt.hash(pass, this.saltHashPassoword);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepo.findByEmail(createUserDto.email);

    // verfify user
    if (userExists?.email) {
      throw new BadRequestException('usuário já existente');
    }

    // create user entity
    const user = new User(createUserDto);
    // create hash of password
    user.password = await this.hashUserPassword(user.password);
    console.log(user.password);
    try {

      // create user
      const createdUser = await this.userRepo.store(user);

      // create lists
      /*  backlog, discover, lead, deal, archived */
      for (const list of ['backlog', 'discover', 'lead', 'deal', 'archived']) {
        await this.listService.create({ name: list }, createdUser.id);
      }

      return createdUser;
    } catch (error) {
      throw new BadRequestException('houve um erro ao tentar criar usuário');
    }
  }

  findByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }
}
