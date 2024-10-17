import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Board } from '../boards/entities/board.entity';
import { PageRequestDto } from '../common/dto/page-request.dto';
import { PaginationRes } from '../common/types/pagination.types';
import { paginate } from '../common/utils/pagination.util';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async findAll(pageRequest: PageRequestDto): Promise<PaginationRes<Article>> {
    const qb = this.articleRepository.createQueryBuilder('entity');
    return paginate(qb, pageRequest);
  }

  async create(createArticleDto: CreateArticleDto) {
    const { boardId, ...rest } = createArticleDto;
    const board = await this.boardRepository.findOne({
      where: {
        id: boardId,
      },
    });
    if (!board) {
      throw new Error('Board not found');
    }

    const article = this.articleRepository.create(rest);
    article.board = board;
    return this.articleRepository.save(article);
  }
}
