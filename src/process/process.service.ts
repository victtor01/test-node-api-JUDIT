import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { ListsService } from '../lists/lists.service';
import { ProcessRepository } from './repositories/process-repository';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProcessService {
  private readonly logger = new Logger(ProcessService.name);

  constructor(
    private readonly listService: ListsService,
    private readonly processRepo: ProcessRepository,
    private configService: ConfigService,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<any> {
    // test params
    if (!createProcessDto?.number || !createProcessDto?.listId) {
      throw new BadRequestException(
        'Campos obrigatórios não foram informados.',
      );
    }

    // find process in list
    const processExists = await this.processRepo.checkInList(
      createProcessDto.listId,
      createProcessDto.number,
    );

    // if process exists
    if (processExists) {
      return {
        success: false,
        message: 'Processo já existe na lista.',
      };
    }

    // create process
    await this.processRepo.create(createProcessDto);

    // log
    this.logger.log('Processo criado com sucesso:', createProcessDto.number);

    // return
    return {
      success: true,
      message: 'Processo criado com sucesso!',
    };
  }

  async capture(cnj: string, userId: string): Promise<any> {
    const JUDIT_API_KEY = this.configService.get<string>('JUDIT_API_KEY');

    // request
    const request = await fetch(
      `https://requests.prod.judit.io/requests?search_type=%22lawsuit_cnj%22&search_key=${cnj}`,
      {
        method: 'GET',
        headers: {
          'api-key': JUDIT_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    // transform json
    const response = await request.json();

    if (!response) {
      throw new BadRequestException(
        'Erro ao buscar dados do Judit: ' + response.error,
      );
    }

    // get lists of user
    const lists = (await this.listService.getListsOfUser(userId))?.[0] || null;
    // test lists
    if (!lists) throw new BadRequestException('Não há nenhuma lista.');

    // function for create process
    const captureProcess = async (process: any) => {
      await this.create({
        number: process.request_id,
        listId: lists.id,
      });
    };

    // loop to create process
    for (const process of response.page_data) {
      await captureProcess(process);
    }

    // return json
    return {
      success: true,
      message: 'Processos capturados com sucesso!',
    };
  }

  // update list
  async updateList({ body, id, userId }) {
    const { listId } = body;
    const list = await this.listService.findUnique(listId);

    if (list?.userId !== userId) {
      throw new UnauthorizedException(
        'Usuário não tem permissão para fazer esse update!',
      );
    }

    try {
      return await this.processRepo.update({ listId }, id);
    } catch (err) {
      throw new BadRequestException(
        'houve um erro ao tentar atualizar o processo de lista!',
      );
    }
  }
}
