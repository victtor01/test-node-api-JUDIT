import { Process } from 'src/process/entities/process.entity';
import { ProcessRepository } from '../process-repository';
import { PrismaService } from '../../../database/prisma.service';
import { CreateProcessDto } from 'src/process/dto/create-process.dto';
import { Injectable } from '@nestjs/common';
import { UpdateProcessDto } from '../../../process/dto/update-process.dto';

@Injectable()
export class PrismaProcessRepository implements ProcessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProcessDto): Promise<Process> {
    return await this.prisma.process.create({
      data,
    });
  }

  async findOneByNumber(number: string): Promise<Process[]> {
    return await this.prisma.process.findMany({
      where: { number },
    });
  }

  async checkInList(listId: string, number: string): Promise<Process> {
    return await this.prisma.process.findFirst({
      where: { listId, number },
    });
  }

  async update(data: UpdateProcessDto, id: string): Promise<Process> {
    return await this.prisma.process.update({
      where: { id },
      data,
    });
  }

  async findAll(listId: string): Promise<Process[]> {
    return await this.prisma.process.findMany({
      where: { listId },
    });
  }
}
