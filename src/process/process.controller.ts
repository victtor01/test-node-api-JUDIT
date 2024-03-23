import {
  Controller,
  Body,
  Req,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { UpdateProcessDto } from './dto/update-process.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get('capture/:cnj')
  async capture(@Param('cnj') cnj: string, @Req() req: { user: User }) {
    return await this.processService.capture(cnj, req.user.id);
  }

  @Put('update-list/:id')
  async updateList(@Param('id') id: string, @Body() body: UpdateProcessDto, @Req() req: { user: User }) {
    return await this.processService.updateList({
      userId: req.user.id,
      body,
      id,
    });
  }

}
