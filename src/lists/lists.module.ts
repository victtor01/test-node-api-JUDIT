import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { PrismaService } from '../database/prisma.service';
import { ListRepository } from './repositories/list-repository';
import { PrismaListRepository } from './repositories/prisma/prisma-list-repository';

@Module({
  controllers: [ListsController],
  providers: [
    ListsService,
    PrismaService,
    {
      provide: ListRepository,
      useClass: PrismaListRepository,
    },
  ],
  exports: [ListsService, ListRepository]
})
export class ListsModule {}
