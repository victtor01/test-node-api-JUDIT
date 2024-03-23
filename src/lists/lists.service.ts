import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './entities/list.entity';
import { ListRepository } from './repositories/list-repository';

@Injectable()
export class ListsService {
  constructor(private readonly listRepo: ListRepository) {}
  // create list
  async create(createListDto: CreateListDto, userId: string) {
    try {
      // serialize list
      const list = new List(createListDto, userId);
      // create in database
      return await this.listRepo.create(list);
    } catch (error) {
      throw new BadRequestException('houve um erro ao tentar criar a lista!');
    }
  }

  async getListsOfUser(userId: string): Promise<List[]> {
    if (!userId) throw new BadRequestException('campos faltando!');
    // get all lists
    return await this.listRepo.findLists(userId);
  }

  async findUnique(id: string): Promise<List> {
    return await this.listRepo.findById(id);
  }

  async findAll(userId: string): Promise<List[]> {
    return await this.listRepo.findAll(userId);
  }

  async findOne(data: { userId: string; listId: string }): Promise<List> {
    if(!data.userId || !data.listId) {
      throw new BadRequestException("campos faltando!")
    }

    const { listId, userId } = data;

    const list = await this.listRepo.findOne(listId);

    if(list.userId !== userId) {
      throw new BadRequestException("permissão negada!")
    }

    return list;
  }
}
