import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Auth } from '../auth/decorators/roles.decorator';
import { USER_ROLES } from '../users/entities/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { PageRequestDto } from '../common/dto/page-request.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(@Query() query: PageRequestDto) {
    return this.articlesService.findAll(query);
  }

  @Post()
  @Auth(USER_ROLES.ADMIN)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }
}
