import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { paginate } from '../common/utils/pagination.util';
import { PaginationRes } from '../common/types/pagination.types';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getBoards(query: PageRequestDto): Promise<PaginationRes<Board>> {
    const qb = this.boardRepository.createQueryBuilder('entity');
    return paginate(qb, query);
  }
  async getByName(name: string): Promise<Board> {
    return this.boardRepository.findOne({
      where: {
        name,
      },
    });
  }

  async createBoard(boardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.save(boardDto);
  }

  async updateBoard(id: string, boardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
    });
    if (!board) {
      throw new Error('Board not found');
    }

    const updatedBoard = { ...board, ...boardDto };
    return this.boardRepository.save(updatedBoard);
  }

  async getBoard(id: string): Promise<Board> {
    return this.boardRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteBoard(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }
}
