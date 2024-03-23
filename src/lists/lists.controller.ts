import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post()
  create(@Body() createListDto: CreateListDto, @Req() req: { user: User }) {
    return this.listsService.create(createListDto, req.user.id);
  }

  @Get()
  async findAll(@Req() req: { user: User }) {
    return await this.listsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Req() req: { user: User }, @Param('id') listId: string) {
    return await this.listsService.findOne({
      userId: req.user.id,
      listId,
    });
  }
}
