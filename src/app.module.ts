import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProcessModule } from './process/process.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ProcessModule, AuthModule, ListsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
