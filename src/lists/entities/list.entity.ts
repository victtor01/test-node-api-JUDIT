import { randomUUID } from 'crypto';
import { CreateListDto } from '../dto/create-list.dto';
import { Process } from 'src/process/entities/process.entity';

export class List {
  id: string = randomUUID();
  name: string;
  userId: string;

  createdAt: Date;
  updatedAt: Date;

  process?: Process[];

  constructor(props: CreateListDto, userId: string) {
    // assign
    Object.assign(this, props);

    // create userId
    this.userId = userId.toString();
  }
}
