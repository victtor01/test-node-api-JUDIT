import { Test, TestingModule } from '@nestjs/testing';
import { ProcessService } from './process.service';
import { ListsModule } from '../lists/lists.module';
import { ConfigModule } from '@nestjs/config';
import { ProcessController } from './process.controller';
import { PrismaService } from '../database/prisma.service';
import { ProcessRepository } from './repositories/process-repository';

describe('ProcessService', () => {
  let service: ProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ListsModule, ConfigModule],
      controllers: [ProcessController],
      providers: [
        ProcessService,
        PrismaService,
        {
          provide: ProcessRepository,
          useClass: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ProcessService>(ProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
