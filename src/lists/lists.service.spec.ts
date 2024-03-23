import { Test, TestingModule } from '@nestjs/testing';
import { ListsService } from './lists.service';
import { PrismaService } from '../database/prisma.service';
import { ListRepository } from './repositories/list-repository';

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListsService,
        PrismaService,
        {
          provide: ListRepository,
          useClass: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<ListsService>(ListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
