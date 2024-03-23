import { CreateProcessDto } from '../dto/create-process.dto';
import { UpdateProcessDto } from '../dto/update-process.dto';
import { Process } from '../entities/process.entity';

export abstract class ProcessRepository {
  abstract create(data: CreateProcessDto): Promise<Process>;
  abstract findOneByNumber(number: string): Promise<Process[]>;
  abstract checkInList(listId: string, number: string): Promise<Process>;
  abstract update(data: UpdateProcessDto, id: string): Promise<Process>;
  abstract findAll(listId: string): Promise<Process[]>;
}
