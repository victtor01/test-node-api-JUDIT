import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { ProcessRepository } from './repositories/process-repository';
import { PrismaProcessRepository } from './repositories/prisma/prisma-process-repository';
import { ListsModule } from 'src/lists/lists.module';
import { PrismaService } from 'src/database/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ListsModule, ConfigModule],
  controllers: [ProcessController],
  providers: [
    ProcessService,
    PrismaService,
    {
      provide: ProcessRepository,
      useClass: PrismaProcessRepository,
    },
  ],
})
export class ProcessModule {}
