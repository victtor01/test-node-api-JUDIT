import { List } from '../../../lists/entities/list.entity';
import { ListRepository } from '../list-repository';
import { PrismaService } from '../../../database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaListRepository implements ListRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<List, 'process'>): Promise<List> {
    return await this.prisma.list.create({
      data,
    });
  }

  async findLists(userId: string): Promise<List[]> {
    return await this.prisma.list.findMany({
      where: { userId },
    });
  }

  async findById(id: string): Promise<List> {
    return await this.prisma.list.findUnique({
      where: { id },
    });
  }

  async findAll(userId: string): Promise<List[]> {
    return await this.prisma.list.findMany({
      where: { userId },
    });
  }

  async findOne(listId: string): Promise<List> {
    return await this.prisma.list.findUnique({
      where: { id: listId },
      include: {
        process: true,
      },
    });
  }
}
