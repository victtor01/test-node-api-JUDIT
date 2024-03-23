import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { ConfigModule } from '@nestjs/config';
import { ListsModule } from '../lists/lists.module';
import { PrismaService } from '../database/prisma.service';
import { ProcessRepository } from './repositories/process-repository';
import { PrismaProcessRepository } from './repositories/prisma/prisma-process-repository';

describe('ProcessController', () => {
  let controller: ProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ListsModule, ConfigModule],
      controllers: [ProcessController],
      providers: [ProcessService, PrismaService, {
        provide: ProcessRepository,
        useClass: PrismaProcessRepository,
      },],
    }).compile();

    controller = module.get<ProcessController>(ProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
