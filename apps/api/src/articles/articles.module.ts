import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { BoardsModule } from '../boards/boards.module';
import { Board } from '../boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Board])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
