import { List } from '../entities/list.entity';

export abstract class ListRepository {
  abstract create(listData: Omit<List, 'process'>): Promise<List>;
  abstract findLists(userId: string): Promise<List[]>
  abstract findById(id: string): Promise<List>
  abstract findAll(userId: string): Promise<List[]>
  abstract findOne(listId: string): Promise<List>
}
